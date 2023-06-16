const Log = require('./util/Log.js');
Log.sapsar("Starting Sapsar...")


const createServer = require('./util/CreateServer.js')
Log.sapsar("Created a server instance...")

const ScanDirectory = require('./util/ScanDirectory.js');

//go through all pages in /pages


const path = require('path');
const { SapsarCompiler, SapsarUnknownPageHandler } = require('./util/SapsarCompiler.js');



let listener = null;



const pagesDirectory = path.join(__dirname, '../../../pages');


async function Build() {

    Log.sapsar("Mapping your pages...")

    const startTime = Date.now();

    const app = await createServer();
    const files = ScanDirectory(pagesDirectory);

 
    

    files.forEach(async (file) => {


        // Add this file to the list of files
        if (path.extname(file) != ".js") return;
        if (file == "_layout.js") return;


        let originalName = file.split(".js")[0];
        let name = file.split(".js")[0];

        
        if (name == "index") name = "";
        if (name == "_layout") return;


        app.get(`/${name}`, async (req, res) => {
            // const loadStart = Date.now();
            res.status(200).end(
                await SapsarCompiler(originalName, req)
            )
            // console.log(`Rendered page ${originalName} in `, Math.round(Date.now() - loadStart), "ms")
            return
        })

        


    });


    app.all('*', async (req, res) => {
        const path = req.path;
        const struct = await SapsarUnknownPageHandler(path)
        res.status(404).send(
            struct
        )
    });


    //set up public directory
    //../public


    listener = app.listen(3000)

    Log.sapsar(`Built the app in ${Date.now() - startTime} ms. Ready to serve on http://localhost:3000`)
}






Build();

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

