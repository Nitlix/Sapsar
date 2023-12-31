const Log = require('./util/Log.js');
const {
    VERSION
} = require('./formats/INFO.js')
Log.sapsar(`Starting Sapsar ${VERSION}...`)
const { handleAllSSG } = require('./app/app');




// Main Sapsar Data
const {
    SapsarCompiler,
    SapsarUnknownPageHandler,
    setBuildStatus,
    importCache,
    exportCache,
    CachePage,
    SapsarLoader,
    SapsarTouch,
    ImportMiddleware
} = require('./util/SapsarCompiler.js');


// Other imports
const ScanDirectory = require('./util/ScanDirectory.js');
const SapsarErrorPage = require('./util/SapsarErrorPage.js');
const createServer = require('./util/CreateServer.js')
const path = require('path');

const Errors = require('./util/Errors.js');




const pagesDirectory = path.join(__dirname, '../../pages');
const uniqueBuildCommands = ["dev", "build"]

/**
 * @param {string} command The command to run. (Default: "dev") List: "dev", "build", "start"
 * @param {number} port The port to run the server on. (Default: 3000)
 * @description The main function to launch your Sapsar app.
 * @command The command "dev" will read all the resources and start a server. Will use the port.
 * @command The command "build" will only export a sapsar.json file with all the file parametric data. Will ignore the port.
 * @command The command "start" will only start a server using the exported sapsar.json file. Will ignore the port.
 * @returns {object} The Express app router instance, to be exported for deployment.
*/
async function launchpad(command="dev", port = 3000) {

    Log.sapsar(`Recieved command: "${command}", and port: ${port}.`)

    if (uniqueBuildCommands.includes(command)) {
        // Leave it be, no cache taken, but cache will be written!
        Log.sapsar("This process will generate a unique build file cache.")
    } else {
        setBuildStatus(false)
        try {
            await importCache()
        } catch (e) {
            Log.sapsar("No critical file cache file was found (at root/sapsar.json). If this code is in a deployment, expect build errors.")
            setBuildStatus(true)
        }

        //check if it's an integer between 0 and 1000 (2nd arg)
    }



    if (typeof port != "number" || port < 1 || port > 50000) {
        Errors.portNotANumber();
        return;
    }

    //set port to null so that the server isn't launched.
    if (command == "build" || command == "start") {
        port = null;
    }





    //timing start

    const startTime = Date.now();

    let app;

    app = createServer();
    // Log.sapsar("Created a server instance...")


    // Log.sapsar("Importing compiler middleware...")
    await ImportMiddleware()


    let files;
    try {
        files = await ScanDirectory(pagesDirectory);
    } catch (e) {
        Errors.noPagesFolder();
        return;
    }



    Log.sapsar("Mapping your pages...")
    const Pages = [];
    const DynamicRoutes = [];

    // Map pages into dynamic and normal
    for (let x = 0; x < files.length; x++) {
        const file = files[x];

        if (path.extname(file) != ".js") return;

        let OriginalName = file.split(".js")[0];
        let AccessName = file.split(".js")[0];

        if (AccessName.endsWith("index")) {
            AccessName = AccessName.split("index")[0];
        }

        if (AccessName.includes(";")) {
            // Dynamic page

            AccessName = AccessName.split(";").join(":")

            const split = AccessName.split("/")
            const all = []

            let stop = false;

            split.forEach(query => {
                if (all.includes(query)) {
                    stop = true;
                }
            })

            if (stop) {
                Log.router(`The main router could not map this query scheme: ${data.access}. Please change your routing format so that the paths being accessed are not the same.`)
                return;
            }

            DynamicRoutes.push({
                original: OriginalName,
                access: AccessName
            })
        } else {
            Pages.push({
                original: OriginalName,
                access: AccessName
            })
        }
    }



    // add dynamic pages on top of normal pages

    for (let x = 0; x < DynamicRoutes.length; x++) {
        const data = DynamicRoutes[x];
        Pages.push(data)
    }


    // BACKEND MAP ALL PAGES TO THE ROUTERS

    for (let x = 0; x < Pages.length; x++) {
        const data = Pages[x];

        // route
        try {
            //generate cache
            const imports = await CachePage(data.original)

            Object.keys(imports).forEach(key => {
                switch (key) {
                    case "GET":
                        app.get(`/${data.access}`, async (req, res) => {
                            await SapsarCompiler(data.original, req, res, "GET")
                            return
                        })
                        break;
                    case "POST":
                        app.post(`/${data.access}`, async (req, res) => {
                            await SapsarCompiler(data.original, req, res, "POST")
                            return
                        })
                        break;
                    case "PUT":
                        app.put(`/${data.access}`, async (req, res) => {
                            await SapsarCompiler(data.original, req, res, "PUT")
                            return
                        })
                        break;
                    case "DELETE":
                        app.delete(`/${data.access}`, async (req, res) => {
                            await SapsarCompiler(data.original, req, res, "DELETE")
                            return
                        })
                        break;
                    case "PATCH":
                        app.patch(`/${data.access}`, async (req, res) => {
                            await SapsarCompiler(data.original, req, res, "PATCH")
                            return
                        })
                        break;
                    case "OPTIONS":
                        app.options(`/${data.access}`, async (req, res) => {
                            await SapsarCompiler(data.original, req, res, "OPTIONS")
                            return
                        })
                        break;
                    case "HEAD":
                        app.head(`/${data.access}`, async (req, res) => {
                            await SapsarCompiler(data.original, req, res, "HEAD")
                            return
                        })
                        break;
                    default:
                        Log.router(`The main router could not map this method: ${key}. Please change your routing format so that the methods being accessed are valid.`)                    
                }
            })
        } 
        catch (e) {
            //error then new line and then stack
            Log.savePageFunctionError(data.original, e)

            app.get(`/${data.access}`, async (req, res) => {
                res.status(400).end(await SapsarErrorPage(
                    `Something went wrong caching page function: ${data.original}`,
                    e.name,
                    e.message,
                    e.stack
                ))
                return
            })
        }

    }




    app.get(`/_sapsar/loader/:id`, async (req, res) => {
        SapsarLoader(req.params.id, res)
    })

    // ====================================
    //CROUTER DEFINED IN CREATE SERVER
    // ====================================

    app.post(`/_sapsar/touch/:id`, async (req, res) => {
        await SapsarTouch(req.params.id, null, res, res)
    })

    app.all('*', async (req, res) => {
        const path = req.path;
        await SapsarUnknownPageHandler(path, req, res)
    });


    //set up public directory
    //../public
    Log.sapsar(`Built the app in ${Date.now() - startTime} ms.`)

    //compiler will process whether to export it or not
    await exportCache();

    await handleAllSSG();

    if (port) {
        let success;
        let tries = 0;
        while (!success) {
            try {
                await new Promise((resolve, reject) => {
                    const server = app.listen(port, () => {
                        resolve();
                    });

                    server.on('error', (error) => {
                        reject(error);
                    });
                });
                success = true;
            } catch (e) {
                tries++;
                port++;
            }
            if (tries > 100) {
                Errors.tooManyLaunchAttempts();
                return;
            }
        }

        if (tries > 0) Log.sapsar(`Instead of using the provided port, we moved to :${port} as the others were busy.`)

        Log.serve(port)
        Log.sapsar(`========================================================================================`)
    } else {
        Log.sapsar(`Build cache created successfully. Your app is ready to be deployed. Exiting...`)
    }


    return app;

}



module.exports = launchpad;