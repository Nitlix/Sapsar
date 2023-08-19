const { div } = require("../base/index")

const Log = require("./Log")
const SapsarErrorPage = require("./SapsarErrorPage")
const { SHIP_TOUCH } = require("../formats/SAPSAR_TOUCH")


const getComplexLevel = require("./getComplexLevel")
const { handleAllBuildProcesses } = require("./ActiveBuild")
const ALLOWED_METHODS = require("../formats/ALLOWED_METHODS")

const fs = require("fs")
const path = require("path")
const Errors = require("./Errors")
const { genChars } = require("./Random")


let cache = {
    css: {
        '*': ''
    },
    js: {
        '*': '',
        touch: SHIP_TOUCH
    },




    html: {
        '*': ''
    },

    custom: {
        noHelp: [],
    },

    PAGE_FUNCTIONS: {
        "GET": {},
        "POST": {},
        "PUT": {},
        "DELETE": {},
        "PATCH": {},
        "OPTIONS": {}
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

    cssLoaderPointers: {
        forward: {

        },
        backward: {

        }
    },  

    jsLoaderPointers: {
        forward: {

        },
        backward: {
        
        }
    },

    componentAlias: [

    ],

    reports: {
        css: {},
        js: {}
    },

    plugins: {
        '*': []
    },

    lang: {
        "*": "en"
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

function checkModal(modal, name){
    if (cache[modal][name]){
        return true;
    }
    return false;
}


function genRandomModal(modal) {
    let name = genChars(12)
    while (checkModal(modal, name)){
        name = genChars(12)
    }
    return name;
}


function getHTML(component){
    if (cache.html[component]) return cache.html[component]
    return "";
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




function getActivePlugins(page){
    const plugins = []

    if (cache.plugins.page) plugins.push(...cache.plugins.page)
    plugins.push(...cache.plugins['*'])
    return plugins;
}

function getPageLang(page){
    let lang = cache.lang["*"]
    if (cache.lang[page]) lang = cache.lang[page]
    return lang;
}







async function RPS(page, content, build, req, res, static=false, ssg=false){
    const render = div({id: "__sapsar"}, content)

    const SSGResources = [];

    // GENERATE FINAL BUNDLES
    //If any aren't empty, add them to the cache



    const ActiveBuild = getComplexLevel(render,';ActiveBuild;', ';/ActiveBuild;')

  
    const ActiveCSS = getComplexLevel(ActiveBuild.edited,';ActiveCSS;', ';/ActiveCSS;')
    let ActiveCSSCode = "#__sapsar{position:relative;z-index:0}"
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


    let LoadBundles = [

    ]

    const LoadCSS = getComplexLevel(activeHeadData.edited, ';LoadCSS;', ';/LoadCSS;')
    let LoadCSSCode = "";
    let LoadCSSExistence = [];

    //manual handling
    for (let x = 0; x < LoadCSS.content.length; x++) {
        if (cache.css[LoadCSS.content[x]]){
            LoadCSSCode += cache.css[LoadCSS.content[x]]
            LoadCSSExistence.push(LoadCSS.content[x])
        }
    }


    const LoadJS = getComplexLevel(LoadCSS.edited, ';LoadJS;', ';/LoadJS;')
    let LoadJSCode = "";
    let LoadJSExistence = [];

    //manual handling
    for (let x = 0; x < LoadJS.content.length; x++) {
        if (cache.js[LoadJS.content[x]]){
            LoadJSCode += (cache.js[LoadJS.content[x]] + "\n")
            LoadJSExistence.push(LoadJS.content[x])
        }
    }

    // Edited by plugins later
    let FinalRender = LoadJS.edited;

    //then plugins do their work on the load content, and add CSS and append classes to LoadCSSExistence


    // ====================
    //    PLUGINS BELOW
    // ====================


    const plugins = getActivePlugins(page);

    await plugins.forEach(async plugin=>{

        const request = {}
        plugin.scopes.forEach(scope=>{
            switch(scope){
                case 'acss':
                    request.acss = ActiveCSSCode;
                    break;
                case 'ajs':
                    request.ajs = ActiveJSCode;
                    break;
                case 'lcss':
                    request.lcss = {
                        code: LoadCSSCode,
                        existence: LoadCSSExistence
                    }
                    break;
                case 'ljs':
                    request.ljs = {
                        code: LoadJSCode,
                        existence: LoadJSExistence
                    }
                    break;
                case 'head':
                    request.head = ActiveHeadCode;
                    break;
                case 'render':
                    request.render = FinalRender;
                    break;
                case 'req':
                    request.req = req;
                    break;
                case 'res':
                    request.res = res;
                    break;
                default:
                    Errors.invalidPluginScope(scope, plugin.name)
                    break;
            }
        })


        const pluginResponse = await plugin.plugin(request)
        pluginResponse.forEach(action=>{
            switch(action.object){
                case "acss":
                    switch(action.method){
                        case "add": 
                            ActiveCSSCode += action.content;
                            break;
                        case "remove":
                            ActiveCSSCode = ActiveCSSCode.replace(action.content, "")
                            break;
                        case "replace":
                            ActiveCSSCode = ActiveCSSCode.replace(action.content[0], action.content[1])
                            break;
                        case "update":
                            ActiveCSSCode = action.content;
                            break;
                        default:
                            Errors.invalidPluginMethod(action.method, action.object, plugin.name)
                    }
                    break;
                case "ajs":
                    switch(action.method){
                        case "add":
                            ActiveJSCode += action.content;
                            break;
                        case "remove": 
                            ActiveJSCode = ActiveJSCode.replace(action.content, "")
                            break;
                        case "replace":
                            ActiveJSCode = ActiveJSCode.replace(action.content[0], action.content[1])
                            break;
                        case "update":
                            ActiveJSCode = action.content;
                            break;
                        default:
                            Errors.invalidPluginMethod(action.method, action.object, plugin.name)
                    }
                    break;
                case "lcss":
                    switch(action.method){
                        case "add":
                            LoadCSSCode += action.content;
                            break;
                        case "remove":
                            LoadCSSCode = LoadCSSCode.replace(action.content, "")
                            break;
                        case "replace":
                            LoadCSSCode = LoadCSSCode.replace(action.content[0], action.content[1])
                            break;
                        case "update":
                            LoadCSSCode = action.content;
                            break;
                        case "addExistences":
                            LoadCSSExistence = LoadCSSExistence.concat(action.content)
                            break;
                        case "removeExistences":
                            action.content.forEach(item=>{
                                LoadCSSExistence = LoadCSSExistence.filter(i=>i!==item)
                            })
                            break;
                        case "replaceExistences":
                            LoadCSSExistence = LoadCSSExistence.filter(i=>i!==action.content[0])
                            LoadCSSExistence.push(action.content[1])
                            break;
                        case "updateExistences":
                            LoadCSSExistence = action.content;
                            break;
                        default:
                            Errors.invalidPluginMethod(action.method, action.object, plugin.name)
                    }
                    break;
                case "ljs":
                    switch(action.method){
                        case "add":
                            LoadJSCode += action.content;
                            break;
                        case "remove":
                            LoadJSCode = LoadJSCode.replace(action.content, "")
                            break;
                        case "replace":
                            LoadJSCode = LoadJSCode.replace(action.content[0], action.content[1])
                            break;
                        case "update":
                            LoadJSCode = action.content;
                            break;
                        case "addExistences":
                            LoadJSExistence = LoadJSExistence.concat(action.content)
                            break;
                        case "removeExistences":
                            action.content.forEach(item=>{
                                LoadJSExistence = LoadJSExistence.filter(i=>i!==item)
                            })
                            break;
                        case "replaceExistences":
                            LoadJSExistence = LoadJSExistence.filter(i=>i!==action.content[0])
                            LoadJSExistence.push(action.content[1])
                            break;
                        case "updateExistences":
                            LoadJSExistence = action.content;
                            break;
                        default:
                            Errors.invalidPluginMethod(action.method, action.object, plugin.name)
                    
                    }
                    break;
                case "head": 
                    switch(action.method){
                        case "add":
                            ActiveHeadCode += action.content;
                            break;
                        case "remove":
                            ActiveHeadCode = ActiveHeadCode.replace(action.content, "")
                            break;
                        case "replace":
                            ActiveHeadCode = ActiveHeadCode.replace(action.content[0], action.content[1])
                            break;
                        case "update":
                            ActiveHeadCode = action.content;
                            break;
                        default:
                            Errors.invalidPluginMethod(action.method, action.object, plugin.name)
                    }
                    break;
                case "render":
                    switch(action.method){
                        case "add":
                            FinalRender += action.content;
                            break;
                        case "remove":
                            FinalRender = FinalRender.replace(action.content, "")
                            break;
                        case "replace":
                            FinalRender = FinalRender.replace(action.content[0], action.content[1])
                            break;
                        case "update":
                            FinalRender = action.content;
                            break;
                        default:
                            Errors.invalidPluginMethod(action.method, action.object, plugin.name)
                    }
                    break;
                default: 
                    Errors.invalidPluginObject(action.object, plugin.name)
            }
        })
    
    })





    // ======================================================
    //    CREATE BUNDLE NAMES FROM MODIFIED LOAD CONTENT
    // ======================================================

    let LoadBundle = ""


    //create a css bundle name in the end
    if (LoadCSSExistence.length > 0){
        CSSBundleName = (()=>{
            let unsorted = LoadCSSExistence;
            let sorted = unsorted.sort()
            let mapping = sorted.join('_')
            if (cache.cssLoaderPointers.backward[mapping]){
                return cache.cssLoaderPointers.backward[mapping]
            }
            else {
                let name = genChars(6)
                while (cache.cssLoaderPointers.forward[name]){
                    name = genChars(6)
                }
                cache.cssLoaderPointers.forward[name] = mapping
                cache.cssLoaderPointers.backward[mapping] = name
                return name
            }
        })()+".css"

        //add to ssg resources
        SSGResources.push({
            path: `/_sapsar/loader/${CSSBundleName}`,
            content: LoadCSSCode
        })

        cache.loaders[CSSBundleName] = LoadCSSCode;
        LoadBundle += `<link data-lcss rel="stylesheet" href="/_sapsar/loader/${CSSBundleName}">`
    }

    //create a js bundle name in the end
    if (LoadJSExistence.length > 0){
        JSBundleName = (()=>{
            let unsorted = LoadJSExistence;
            let sorted = unsorted.sort()
            let mapping = sorted.join('_')
            if (cache.jsLoaderPointers.backward[mapping]){
                return cache.jsLoaderPointers.backward[mapping]
            }
            else {
                let name = genChars(6)
                while (cache.jsLoaderPointers.forward[name]){
                    name = genChars(6)
                }
                cache.jsLoaderPointers.forward[name] = mapping
                cache.jsLoaderPointers.backward[mapping] = name
                return name
            }
        })()+".js"

        //add to ssg resources
        SSGResources.push({
            path: `/_sapsar/loader/${JSBundleName}`,
            content: LoadJSCode
        })

        cache.loaders[JSBundleName] = LoadJSCode;
        LoadBundle += `<script data-ljs src="/_sapsar/loader/${JSBundleName}"></script>`
    }





    // =================
    // ADD ACTIVE CODE
    // =================

    if (ActiveCSSCode){
        ActiveCSSCode = `<style data-acss>${ActiveCSSCode}</style>`
    }

    if (ActiveJSCode){
        ActiveJSCode = `<script data-ajs>${ActiveJSCode}</script>`
    }




    

    
    
    // ===================
    // ADD FINAL RENDER
    // ===================

    const finish = `<!DOCTYPE html><html lang="${getPageLang(page)}"><head>`+
        `<meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />`+
        `<script data-sapsar>const build = {id: "${build}"}</script>`+
        `<script data-crouter src="/_sapsar/crouter.js"></script>`+
        ActiveHeadCode+
        
        handleHead(page)+
        
        // Active stuff
        ActiveCSSCode+
        ActiveJSCode+

        // Loaded stuff
        LoadBundle+"</head><body>"+
    
        //Final body render below
        FinalRender+"</body></html>"

    if (!ssg){
        return {
            Page: finish,
            ActiveBuild: ActiveBuild.content,
        }
    }

    // Else return SSG

    return {
        Page: finish,
        Resources: SSGResources,
        ActiveBuild: ActiveBuild.content,
    }
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
    const pageImport = (await import(`../../../pages/${page}.js`))
    const imports = {

    }

    // ASSIGN DEFAULT EXPORT TO "GET"
    if (pageImport.default){
        imports.GET = pageImport.default
        cache.PAGE_FUNCTIONS["GET"][page] = pageImport.default
    }

    // CHECK OTHER KNOWN EXPORTS
    ALLOWED_METHODS.forEach(method=>{
        if (pageImport[method]){
            imports[method] = pageImport[method]
            cache.PAGE_FUNCTIONS[method][page] = pageImport[method]
        }
    })

    return imports;
}


async function ReCachePage(page){
    Object.keys(cache.PAGE_FUNCTIONS).forEach(method=>{
        if (cache.PAGE_FUNCTIONS[method][page]){
            delete cache.PAGE_FUNCTIONS[method][page]
        }
    })
    const imports = await CachePage(page)
    return imports;
}


// Compiler Code
async function SapsarCompiler(page, req, res, method="GET", ssg=false){
    const middleWareStop = await SapsarMiddleware(req, res)

    if (middleWareStop == false){


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

                
                try {
                    // No help from the compiler, let the page compiler handle it completely.
                    if (cache.custom.noHelp.includes(page)){
                        const Rendered_Page = await cache.PAGE_FUNCTIONS[method][page](req, res)

                        cache.static.pages[path] = Rendered_Page;
                        return;
                    }
                    else {
                        

                        const buildId = "SAPSAR-EXPERIMENTAL"
                        //Render page
                        const pageRender = await cache.PAGE_FUNCTIONS[method][page](req, res, buildId, req.params)

                        if (!pageRender) return;
                        res.setHeader('Content-Type', 'text/html')


                        let struct = await RPS(
                            page, 
                            pageRender, 
                            buildId, 
                            req,
                            res,
                            false
                        )

                        res.write(struct.Page)
                        finalContent += struct.Page

                        //post render
                        //run active build scripts

                        
                        finalContent = await handleAllBuildProcesses(struct.ActiveBuild, (render)=>{
                            content += render
                            res.write(render)
                        })



                        // everything executed
                        // ending response
                        res.end()
                        // removeBuild(buildId) 
                        cache.static.pages[path] = finalContent

                        return;
                    }
                }
                catch(err){
                    Log.renderError(page, err)

                    //dispay error page

                    // const stack = err.stack.split("at SapsarCompiler")[0]
                    const stack = err.stack

                    const struct = await RPS(
                        "DEFAULT-RENDER-ERROR",
                        SapsarErrorPage(`Error while rendering static page: ${page}`, err.name, err.message, stack),
                        "SAPSAR-EXPERIMENTAL",
                        req,
                        res,
                        false
                    )

                    res.status(500).end(
                        struct.Page
                    )

                    return;
                }


            }
        

            try {
                // New page render
                
                if (cache.custom.noHelp.includes(page)){
                    await cache.PAGE_FUNCTIONS[method][page](req, res);
                    return;
                }
                else {
                    const buildId = "SAPSAR-EXPERIMENTAL"
                                
                    const pageRender = await cache.PAGE_FUNCTIONS[method][page](req, res, buildId, req.params)

                    if (!pageRender) return;
                    res.setHeader('Content-Type', 'text/html')

                    let struct = await RPS(
                        page, 
                        pageRender, 
                        buildId, 
                        req,
                        res,
                        false,
                        ssg
                    )

                    res.write(struct.Page)
                    
                    //post render
                    //run active build scripts


                    await handleAllBuildProcesses(struct.ActiveBuild, (render)=>{
                        res.write(render)
                    })

                    // everything executed
                    // ending response

                    res.end()
                    // removeBuild(buildId)
                    return;
                }

            }

            
            catch(err){
                Log.renderError(page, err)
                

                //dispay error page

                // const stack = err.stack.split("at SapsarCompiler")[0]
                const stack = err.stack

                const struct = await RPS(
                    "DEFAULT-RENDER-ERROR",
                    SapsarErrorPage(`Error while rendering page: ${page}`, err.name, err.message, stack),
                    "SAPSAR-EXPERIMENTAL",
                    req,
                    res,
                    false
                )

                res.status(500).end(
                    struct.Page
                )

                return;
            }
        }
    }
}




async function SapsarUnknownPageHandler(page, req, res){
    
    //get full request path
    let found;
    let foundPath;
    let path = req.url.split("/")
    path.shift()

    path = path.map((item, index)=>{
        if (index != path.length - 1) return item+"/"
        
        return item
    })
    
    while (!found){
        path.pop()
        const dir = path.join("")
        
        if (cache.PAGE_FUNCTIONS.GET[`${dir}404`]){
            found = true;
            foundPath = dir + "404"
        }

        if (path.length == 0){
            break;
        }
    }
    
    if (foundPath){
        //Custom 404 page

        //render

        //no help
        if(cache.custom.noHelp.includes(foundPath)){
            await cache.PAGE_FUNCTIONS.GET[foundPath](req, res)
            return;
        }
        //with help

        res.setHeader('Content-Type', 'text/html')
        res.status(404)
        
        const buildId = "SAPSAR-EXPERIMENTAL"

        const pageRender = await cache.PAGE_FUNCTIONS.GET[foundPath](req, res, buildId, req.params)

        if (!pageRender) return;
        res.setHeader('Content-Type', 'text/html')


        let struct = await RPS(
            page, 
            pageRender, 
            buildId, 
            req,
            res,
            false
        )

        res.write(struct.Page)


        //post render

        //run active build scripts
        await handleAllBuildProcesses(struct.ActiveBuild, (render)=>{
            res.write(render)
        })

        // everything executed
        res.end();
        // removeBuild(buildId)
        
        return;


    }
    else {

        const struct = await RPS(
            "404-DEFAULT-RENDER",
            SapsarErrorPage(`Page <b>${page}</b> not found`, "Error 404", "Page not found", `Try re-checking your app's page files, and seeing if the one you're looking for exists, or simply try relaunching your app.`),
            "SAPSAR-EXPERIMENTAL",
            req,
            res,
            false
        )

        res.status(404).end(
            struct.Page
        )

        return;
    }
}

// export compiler (as default) and cache

const SAPSAR_CACHE_LOCATION = '../../../sapsar.json'

async function exportCache(){
    if (!building) return;
    await fs.writeFileSync(path.join(__dirname, SAPSAR_CACHE_LOCATION), JSON.stringify(cache))
    Log.compiler("Cache exported to sapsar.json")
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
    genRandomModal,
    checkModal,
    ImportMiddleware,
    exportCache,
    importCache,
    setBuildStatus,
    getBuildStatus,
    getProductionStatus,
    setProductionStatus,
    CachePage,
    ReCachePage,
    SapsarLoader,
    SapsarTouch,
    building,
    getHTML
}


//MaxJ my beloved ☠️
Log.compiler("Sapsar Compiler loaded and ready for action.")