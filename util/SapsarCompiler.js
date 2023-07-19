const { doctype, head, html, body, meta } = require("sapsar/base")

const Log = require("./Log")
const SapsarErrorPage = require("./SapsarErrorPage")
const { SHIP_TOUCH } = require("../formats/SAPSAR_TOUCH")


const getComplexLevel = require("./getComplexLevel")
const { createUniqueBuild, getBuildProcesses, removeBuild } = require("./ActiveBuild")

const fs = require("fs")
const path = require("path")


let cache = {
    css: {
        '*': ''
    },
    js: {
        '*': '',
        touch: SHIP_TOUCH
    },

    pageCompilers: {

    },

    ship: {

    },

    head: {
        '*': ' '
    },
    
    touch: {
        actions: {
            
        }
    },

    static: {
        pages: {},
        useQueries: [],
        requests: []
    },

    loaders: {
    },

    reports: {
        css: {},
        js: {}
    },

    util: {
        404: null
    },

    plugins: {

    }
}



let SapsarMiddleware = (req, res) => {return false;}


async function ImportMiddleware(){
    try {
        SapsarMiddleware = (await import(`../../../middleware/middleware.js`)).default
        Log.compiler("Imported custom middleware!")
    }
    catch(e){
        Log.compiler("Not using custom middleware.")
    }
}






let building = true;
let production = true;

function setBuildStatus(status){
    building = status
}

function getBuildStatus(){
    return building
}

function getProductionStatus(){
    return production;
}

function setProductionStatus(status){
    production = status;
    return production;
}


function handleHead(page){
    let content = ""

    if (cache.head[page]){
        content += cache.head[page]
    }

    content += cache.head['*']

    // add css report
    if (cache.reports.css[page]){
        const final = ""
        for (let x = 0; x < cache.reports.css[page].length; x++) {
            const component = cache.reports.css[page][x];
            if (cache.css[component]){
                content += cache.css[component]
            }
        }
        if (final){
            content += `<style data-rcss>${final}</style>`
        }
    }

    // add js report
    if (cache.reports.js[page]){
        const final = ""
        for (let x = 0; x < cache.reports.js[page].length; x++) {
            const component = cache.reports.js[page][x];
            if (cache.js[component]){
                content += cache.js[component]
            }
        }
        if (final){
            content += `<script data-rjs>${final}</script>`
        }
    }


    return content
}




function SapsarLoader(id, res){
    if (cache.loaders[id]){
        res.status(200).end(cache.loaders[id])
        // Do not delete in case there's a double request
        // delete cache.loaders[id]
    }
    else {
        res.status(404).end("{}")
    }
}









async function RPS(page, content, build, static=false){


    if (typeof content === "object"){
        content = content.join("")
    }
    const render = `<body class="sapsar-dom">${content}</body>`
  

  
    const ActiveCSS = getComplexLevel(render,';ActiveCSS;', ';/ActiveCSS;')
    let ActiveCSSCode = ""
    for (let x = 0; x < ActiveCSS.content.length; x++) {
        if (cache.css[ActiveCSS.content[x]]){
            ActiveCSSCode += cache.css[ActiveCSS.content[x]]
        }
    }

    const ActiveJS = getComplexLevel(ActiveCSS.edited, ';ActiveJS;', ';/ActiveJS;')
    let ActiveJSCode = ""
    for (let x = 0; x < ActiveJS.content.length; x++) {
        if (cache.js[ActiveJS.content[x]]){
            ActiveJSCode += (cache.js[ActiveJS.content[x]] + "\n")
        }
    }

    const activeHeadData = getComplexLevel(ActiveJS.edited, ';ActiveHead;', ';/ActiveHead;')
    let ActiveHeadCode = ""
    for (let x = 0; x < activeHeadData.content.length; x++) {
        ActiveHeadCode += activeHeadData.content[x]
    }

    const loadCSS = getComplexLevel(activeHeadData.edited, ';LoadCSS;', ';/LoadCSS;')
    let LoadCSSCode = ""
    for (let x = 0; x < loadCSS.content.length; x++) {
        if (cache.css[loadCSS.content[x]]){
            LoadCSSCode += cache.css[loadCSS.content[x]]
        }
    }

    const loadJS = getComplexLevel(loadCSS.edited, ';LoadJS;', ';/LoadJS;')
    let LoadJSCode = ""
    for (let x = 0; x < loadJS.content.length; x++) {
        if (cache.js[loadJS.content[x]]){
            LoadJSCode += (cache.js[loadJS.content[x]] + "\n")
        }
    }

    let finalRender = loadJS.edited;

    //let the plugins do their work
    const methods = ['add']
    const addingTypes = ['acss', 'ajs', 'ahead', 'lcss', 'ljs']
    
    const plugins = Object.keys(cache.plugins)
    await plugins.forEach(async plugin_name => {
        const pluginFunc = cache.plugins[plugin_name];
        const data = await pluginFunc(finalRender, page, build, {
            ActiveCSS: ActiveCSSCode,
            ActiveJS: ActiveJSCode,
            ActiveHead: ActiveHeadCode,
            LoadCSS: LoadCSSCode,
            LoadJS: LoadJSCode,
            FullPage: finalRender,
        })

        for (let x = 0; x < data.length; x++){
            switch (data[x].method){
                case 'add':
                    switch (data[x].data.type){
                        case 'acss':
                            ActiveCSSCode += data[x].data.content
                            break;
                        case 'ajs':
                            ActiveJSCode += data[x].data.content
                            break;
                        case 'ahead':
                            ActiveHeadCode += data[x].data.content
                            break;
                        case 'lcss':
                            LoadCSSCode += data[x].data.content
                            break;
                        case 'ljs':
                            LoadJSCode += data[x].data.content
                            break;
                        default:
                            throw new Error(`At Compiler RPS: Invalid adding type at plugin "${plugin_name}": "${data[x].data.type}". Only "${addingTypes.join(', ')}" are valid.`)
                    }
                    break;
                case 'replace':
                    switch (data[x].data.type){
                        case 'acss':
                            ActiveCSSCode = data[x].data.content
                            break;
                        case 'ajs':
                            ActiveJSCode = data[x].data.content
                            break;
                        case 'ahead':
                            ActiveHeadCode = data[x].data.content
                            break;
                        case 'lcss':
                            LoadCSSCode = data[x].data.content
                            break;
                        case 'ljs':
                            LoadJSCode = data[x].data.content
                            break;
                        default:
                            throw new Error(`At Compiler RPS: Invalid replacing type at plugin "${plugin_name}": "${data[x].data.type}". Only "${addingTypes.join(', ')}" are valid.`)
                        }
                    break;  

                //default
                default:
                    throw new Error(`At Compiler RPS: Invalid method at plugin "${plugin_name}": "${data[x].method}". Only "${methods.join(', ')}" are valid.`)
                
                
            }
        }
    })






    // GENERATE FINAL BUNDLES
    //If any aren't empty, add them to the cache
    let loadBundle = ""



    if(LoadCSSCode){
        let cssBundleName = `${build}.css`
        if (static){
            cssBundleName = `static_${page}.css`
        }
        else {
            setTimeout(()=>{
                if (cache.loaders[cssBundleName]){
                    delete cache.loaders[cssBundleName]
                }
            }, 10000)
        }

        if (!cache.loaders[cssBundleName]) cache.loaders[cssBundleName] = LoadCSSCode

        loadBundle += `<link rel="stylesheet" data-lcss href="/_sapsar/loader/${build}.css" />`
    }

    if(LoadJSCode){
        let jsBundleName = `${build}.js`
        if (static){
            jsBundleName = `static_${page}.js`
        }
        else {
            setTimeout(()=>{
                if (cache.loaders[jsBundleName]){
                    delete cache.loaders[jsBundleName]
                }
            }, 10000)
        }
        
        if (!cache.loaders[jsBundleName]) cache.loaders[jsBundleName] = LoadJSCode


        loadBundle += `<script data-ljs src="/_sapsar/loader/${build}.js"></script>`
    }


    if (ActiveCSSCode){
        ActiveCSSCode = `<style data-acss>${ActiveCSSCode}</style>`
    }

    if (ActiveJSCode){
        ActiveJSCode = `<script data-ajs>${ActiveJSCode}</script>`
    }

    
    //return final structure

    return `<!DOCTYPE html><html lang="en">${head(
        `<meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />`,
        `<script data-sapsar>const build = {id: "${build}"}</script>`,
        ActiveHeadCode,
        
        handleHead(page),
        
        // Active stuff
        ActiveCSSCode,
        ActiveJSCode,

        // Loaded stuff
        loadBundle
    
    //Final body render below
    )}${finalRender}</html>`
}






async function SapsarTouch(func, buildId, req, res){
    if (cache.touch.actions[func]){
        const data = await cache.touch.actions[func](req.body, req)
        await res.end(JSON.stringify(data)) 
    }
    else {
        res.end(JSON.stringify({"execute": "console.error('Sapsar could not find this Touch Action.')"}))
    }
}



async function CachePage(page) {
    // Log.sapsar(`Generating PAGE FUNCTION CACHE for ${page}...`)
    cache.pageCompilers[page] = (await import(`../../../pages/${page}.js`)).default
    return;
}


// Compiler Code
async function SapsarCompiler(page, req, res, dynamic=false){

    const middleWareStop = await SapsarMiddleware(req, res)

    if (middleWareStop == false){

        res.setHeader('Content-Type', 'text/html')

        const withQuery = req.originalUrl
        const path = req.path
        

        // Serve static page

        if (cache.static.pages[path] || cache.static.pages[withQuery]) {

            if (cache.static.pages[withQuery]){
                res.end(
                    cache.static.pages[withQuery]
                )
            }
            else {
                res.end(
                    cache.static.pages[path]
                )
            }
        }

        else {
            // Dynamic page, or generate static page    

            // Static page 

            if (cache.static.requests.includes(page)){
                let finalContent = ""

                Log.compiler(`Generating STATIC PAGE CACHE for ${page} (SPEC: ${path})...`)

                const buildId = createUniqueBuild(res)
                
                const Rendered_Page = await cache.pageCompilers[page](req, buildId, req.params)

                const struct = await RPS(page, Rendered_Page, buildId, true)

                
                res.write(struct)
                finalContent += struct


                //post render
                //run active build scripts

                

                let activeBuildProcesses = getBuildProcesses(buildId)
                for (let x = 0; x < activeBuildProcesses.length; x++) {
                    let processData = activeBuildProcesses[x]
                    let processContent = await processData.process(processData.args)

                    res.write(processContent)
                    finalContent += processContent
                }

                // everything executed
                // ending response
                res.end()
                removeBuild(buildId)
                  


                cache.static.pages[path] = finalContent



                // End page render
                // End page caching
                return
            }
        

            try {
                // New page render



                const buildId = createUniqueBuild(res)
                            
                const Rendered_Page = await cache.pageCompilers[page](req, buildId, req.params)


                const struct = await RPS(page, Rendered_Page, buildId)
                
                res.write(struct)


                //post render
                //run active build scripts

                

                let activeBuildProcesses = getBuildProcesses(buildId)
                for (let x = 0; x < activeBuildProcesses.length; x++) {
                    let processData = activeBuildProcesses[x]

                    res.write(await processData.process(processData.args))
                }

                // everything executed
                // ending response

                res.end()
                removeBuild(buildId)
                return;

            }

            
            catch(err){
                Log.renderError(page, err)
                

                //dispay error page

                // const stack = err.stack.split("at SapsarCompiler")[0]
                const stack = err.stack

                res.status(400).end(
                    SapsarErrorPage(`Error while rendering page: ${page}`, err.name, err.message, stack)
                )
            }
        }

    }
}




async function SapsarUnknownPageHandler(page, req, res){
    if (cache.pageCompilers['errors/_404']){

        //Custom 404 page

        //render
        
        const buildId = createUniqueBuild(res)

        const Rendered_Page = await cache.pageCompilers['errors/_404'](req, buildId, req.params)

        const struct = await RPS(page, Rendered_Page, buildId)

        res.write(struct)


        //post render

        let activeBuildProcesses = getBuildProcesses(buildId)
        for (let x = 0; x < activeBuildProcesses.length; x++) {
            let processData = activeBuildProcesses[x]

            res.write(await processData.process(processData.args))
        }

        // everything executed

        removeBuild(buildId)
        res.end()


    }
    else {
        res.status(404).end(SapsarErrorPage(
            `Page <b>${page}</b> not found`,
            "Error 404",
            "Page not found",
            `Try re-checking your app's page files, and seeing if the one you're looking for exists, or simply try relaunching your app.
            
            Want a custom 404 error page? Create a file called <b>_404.js</b> in a seperate folder called <b>errors</b> inside your <b>pages</b> folder, and export a simple page function with two inputs: <b>data</b> and <b>page</b>.
            `
        ))
    }
}

// export compiler (as default) and cache

const SAPSAR_CACHE_LOCATION = '../../../sapsar.json'

async function exportCache(){
    if (!building) return;
    await fs.writeFileSync(path.join(__dirname, SAPSAR_CACHE_LOCATION), JSON.stringify(cache))
}

async function importCache(){
    cache = JSON.parse(
        await fs.readFileSync(path.join(__dirname, SAPSAR_CACHE_LOCATION)).toString()
    )
}


module.exports = {
    SapsarCompiler,
    SapsarUnknownPageHandler,
    cache,
    ImportMiddleware,
    exportCache,
    importCache,
    setBuildStatus,
    getBuildStatus,
    getProductionStatus,
    setProductionStatus,
    CachePage,
    SapsarLoader,
    SapsarTouch,
    building
}


//MaxJ my beloved ☠️
Log.compiler("Sapsar Compiler loaded and ready for action.")