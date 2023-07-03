const Log = require('./util/Log.js');
const { VERSION }  = require('./data/INFO.JS')

Log.sapsar(`Starting Sapsar ${VERSION}...`)


// Main Sapsar Data
const {
    SapsarCompiler,
    SapsarUnknownPageHandler,
    setBuildStatus,
    importCache,
    exportCache,
    CachePage
} = require('./util/SapsarCompiler.js');


// Other imports
const ScanDirectory = require('./util/ScanDirectory.js');
const ListCycle = require('lixtools/list/cycle')
const SapsarErrorPage = require('./util/SapsarErrorPage.js');
const createServer = require('./util/CreateServer.js')
const path = require('path');




// Determine if the user is building or not




let listener;

let onlyBuilding = false;

const pagesDirectory = path.join(__dirname, '../../../pages');

let port = 3000;

async function map() {

    
    if (process.argv[2] == "gen_cache") {
        // Leave it be, no cache taken, but cache will be written
        Log.sapsar("This process will generate a unique build file cache.")
    }
    //check if it's an integer between 0 and 1000

    else {
        setBuildStatus(false)
        try {
            await importCache()
        }
        catch (e) {
            Log.sapsar("No critical file cache file was found (at root/sapsar.js). If this code is in a deployment, expect build errors.")
            setBuildStatus(true)
        }

        //check if it's an integer between 0 and 1000 (2nd arg)
        if (process.argv[2] != undefined) {
            port = parseInt(process.argv[2]);
        }
    }

    if (process.argv[3] == "build"){
        onlyBuilding = true;
    }




    const startTime = Date.now();

    let app;

    app = createServer();
    Log.sapsar("Created a server instance...")

    
    
    Log.sapsar("Mapping your pages...")
    const files = ScanDirectory(pagesDirectory);




    const NormalPages = [];
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

            ListCycle(split, (query) => {
                if (all.includes(query)) {
                    stop = true;
                }
            })

            if (stop) {
                Log.router(`The main router could not route this query scheme: ${data.access}. Please change your routing format so that the paths being accessed are not the same.`)
                return;
            }

            DynamicRoutes.push({
                original: OriginalName,
                access: AccessName
            })
        } else {
            NormalPages.push({
                original: OriginalName,
                access: AccessName
            })
        }
    }





    // Router for normal pages

    for (let x = 0; x < NormalPages.length; x++) {
        const data = NormalPages[x];

        // route
        try {
            //generate cache
            await CachePage(data.original)

            app.get(`/${data.access}`, async (req, res) => {
                await SapsarCompiler(data.original, req, res)
                return
            })
        } catch (e) {
            Log.buildError(`Error trying to save page function: ${data.original}`)

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



    for (let x = 0; x < DynamicRoutes.length; x++) {
        const data = DynamicRoutes[x];

        //route dynamic

        try {
            //generate cache
            await CachePage(data.original)

            app.get(`/${data.access}`, async (req, res) => {
                await SapsarCompiler(data.original, req, res, true)
                return
            })
        } catch (e) {
            Log.buildError(`Error trying to save dynamic route page function: ${data.original}`)

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




    app.all('*', async (req, res) => {
        const path = req.path;
        await SapsarUnknownPageHandler(path, req, res)
    });


    //set up public directory
    //../public
    Log.sapsar(`Built the app in ${Date.now() - startTime} ms.`)

    //compiler will process whether to export it or not
    await exportCache();

    if(!onlyBuilding){
        listener = app.listen(port)

        Log.sapsar(`Ready to serve on http://localhost:${port}. Any debugging or errors will be logged below.`)
        Log.sapsar(`==============================================================================================================`)
    }
    else {
        Log.sapsar(`Build cache created successfully. Your app is ready to be deployed. Exiting...`)
    }

    
    return app;

}


const app = map();

module.exports = app;

// async function onUpdate(path) {
//     await listener.close();
//     clearCacheData();
//     await clearTimeout(compilation_thread);
//     compilation_thread = setTimeout(compile, 5);
// }

// const allDirectory = path.join(__dirname, '../');


// const watcher = chokidar.watch(allDirectory, {
//     ignored: /(^|[\/\\])\../, // ignore dotfiles
//     persistent: true
// });

// watcher.on('change', path => {
//     onUpdate(path);
// });