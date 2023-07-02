const Log = require('./util/Log.js');
Log.sapsar("Starting Sapsar...")


const createServer = require('./util/CreateServer.js')
Log.sapsar("Created a server instance...")

const ScanDirectory = require('./util/ScanDirectory.js');

const ListCycle = require('lixtools/list/cycle')

const CachePage = require('./util/CachePage.js');

const SapsarErrorPage = require('./util/SapsarErrorPage.js');





const path = require('path');

const {
    SapsarCompiler,
    SapsarUnknownPageHandler
} = require('./util/SapsarCompiler.js');



let listener = null;



const pagesDirectory = path.join(__dirname, '../../../pages');


async function map() {

    Log.sapsar("Mapping your pages...")

    const startTime = Date.now();

    const app = createServer();
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


    listener = app.listen(3000)

    Log.sapsar(`Built the app in ${Date.now() - startTime} ms. Ready to serve on http://localhost:3000. Any debugging or errors will be logged below.`)
    Log.sapsar(`==============================================================================================================`)
    
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