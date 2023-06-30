const Log = require('./util/Log.js');
Log.sapsar("Starting Sapsar...")


const createServer = require('./util/CreateServer.js')
Log.sapsar("Created a server instance...")

const ScanDirectory = require('./util/ScanDirectory.js');

const ListCycle = require('lixtools/list/cycle')

//go through all pages in /pages




const path = require('path');

const { SapsarCompiler, SapsarUnknownPageHandler } = require('./util/SapsarCompiler.js');
const { serveStream } = require('./util/SapsarStream.js');



let listener = null;



const pagesDirectory = path.join(__dirname, '../../../pages');



Log.sapsar("Mapping your pages...")

const startTime = Date.now();

const app = createServer();
const files = ScanDirectory(pagesDirectory);




const NormalPages = [];
const DynamicPages = [];

// Map pages into dynamic and normal
ListCycle(files, (file) => {
    if (path.extname(file) != ".js") return;
    
    let OriginalName = file.split(".js")[0];
    let AccessName = file.split(".js")[0];

    if (AccessName.endsWith("index")) {
        AccessName = AccessName.split("index")[0];
    }

    if (AccessName.includes(";")) {
        // Dynamic page

        AccessName = AccessName.split(";").join(":")

        DynamicPages.push({
            original: OriginalName,
            access: AccessName
        }
        )
    }
    else {
        NormalPages.push({
            original: OriginalName,
            access: AccessName
        }
        )
    }
})





// Router for normal pages

ListCycle(NormalPages, async (data) => {
    // route
    app.get(`/${data.access}`, async (req, res) => {
        await SapsarCompiler(data.original, req, res)
        return
    })
});



ListCycle(DynamicPages, async (data) => {

    //route 
    const split = data.access.split("/")
    const all = []

    let stop = false;

    ListCycle(split, (query)=>{
        if (all.includes(query)){
            stop = true;
        }
    })

    if (stop) {
        Log.router(`The main router could not route this query scheme: ${data.access}. Please change your routing format so that the paths being accessed are not the same.`)
        return;
    }

    app.get(`/${data.access}`, async (req, res) => {
        await SapsarCompiler(data.original, req, res, true)
    })
})




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

