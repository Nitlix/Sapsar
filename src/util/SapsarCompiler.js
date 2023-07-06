const { doctype, head, html, body, meta } = require("sapsar/base")

const Log = require("./Log")
const SapsarErrorPage = require("./SapsarErrorPage")
const { SHIP_TOUCH } = require("../formats/SAPSAR_TOUCH")

const useCSS = require("../use/useCSS")
const useJS = require("../use/useJS")

const getComplexLevel = require("./getComplexLevel")
const { createUniqueBuild, getBuildProcesses, removeBuild } = require("./ActiveBuild")

const fs = require("fs")
const path = require("path")


const cacheFormat = {
    css: {
        '*': ''
    },
    js: {
        '*': '',
        touch: SHIP_TOUCH
    },


    pageCompilers: {

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

}


let SapsarMiddleware = (req, res) => {return false;}


async function ImportMiddleware(){
    try {
        SapsarMiddleware = (await import(`../../../../middleware/middleware.js`)).default
        Log.compiler("Imported custom middleware!")
    }
    catch(e){
        Log.compiler("Not using custom middleware.")
    }
}




let cache = JSON.parse(JSON.stringify(cacheFormat))

let building = true;

function setBuildStatus(status){
    building = status
}

function getBuildStatus(){
    return building
}

function getProductionStatus(){
    return true;
}



function handleHead(page){
    let content = ""

    if (cache.head[page] != undefined){
        content += cache.head[page]
    }

    content += cache.head['*']

    // add css report
    if (cache.reports.css[page]){
        for (let x = 0; x < cache.reports.css[page].length; x++) {
            const component = cache.reports.css[page][x];
            
            content += `<style data-rcss>${cache.css[component]}</style>`
        }
    }

    // add js report
    if (cache.reports.js[page]){
        for (let x = 0; x < cache.reports.js[page].length; x++) {
            const component = cache.reports.js[page][x];

            content += `<script data-rjs>${cache.js[component]}</script>`
        }
    }


    return content
}





function SapsarLoader(id, res){
    if (cache.loaders[id]){
        res.status(200).end(cache.loaders[id])
        delete cache.loaders[id]
    }
    else {
        res.status(404).end("{}")
    }
}




async function addComplexCSS(component, triedAdding=false){
    if (cache.css[component]){
        return `<style data-acss>${cache.css[component]}</style>`
    }
    else {
        if (triedAdding == false){
            await useCSS(component)
            return await addComplexCSS(component, true)
        }
        return ""
    }
}

async function addcomplexJS(component, triedAdding=false){
    if (cache.js[component]){
        return `<script data-ajs>${cache.js[component]}</script>`
    }
    else {
        if (triedAdding == false){
            await useJS(component)
            return await addcomplexJS(component, true)
        }
        return ""
    }
}


async function addLoadCSS(component, triedAdding=false){
    if (cache.css[component]){
        return cache.css[component]
    }
    else {
        if (triedAdding == false){
            await useCSS(component)
            return await addLoadCSS(component, true)
        }
        else {
            return ""
        }
    }
}

async function addLoadJS(component, triedAdding=false){
    if (cache.js[component]){
        return cache.js[component] + "\n"
    }
    else {
        if (triedAdding == false){
            await useJS(component)
            return await addLoadJS(component, true)
        }
        return ""
    }
}


async function renderPageStruct(page, content, build, static=false){
  
    const complexCSS = getComplexLevel(
        body(
            content,
            {
                class: "sapsar-dom"
            }
        ),
        ';ActiveCSS;', 
        ';/ActiveCSS;'
    )

    let finalComplexCSS = ""
    for (let x = 0; x < complexCSS.content.length; x++) {
        finalComplexCSS += await addComplexCSS(complexCSS.content[x])
    }

    const complexJS = getComplexLevel(complexCSS.edited, ';ActiveJS;', ';/ActiveJS;')
    let finalComplexJS = ""
    for (let x = 0; x < complexJS.content.length; x++) {
        finalComplexJS += await addcomplexJS(complexJS.content[x])
    }

    const activeHeadData = getComplexLevel(complexJS.edited, ';ActiveHead;', ';/ActiveHead;')
    let finalActiveHead = ""
    for (let x = 0; x < activeHeadData.content.length; x++) {
        finalActiveHead += activeHeadData.content[x]
    }

    const loadCSS = getComplexLevel(activeHeadData.edited, ';LoadCSS;', ';/LoadCSS;')
    let finalLoadCSS = ""
    for (let x = 0; x < loadCSS.content.length; x++) {
        finalLoadCSS += await addLoadCSS(loadCSS.content[x])
    }

    const loadJS = getComplexLevel(loadCSS.edited, ';LoadJS;', ';/LoadJS;')
    let finalLoadJS = ""
    for (let x = 0; x < loadJS.content.length; x++) {
        finalLoadJS += await addLoadJS(loadJS.content[x])
    }







    //If any aren't empty, add them to the cache
    let loadBundle = ""
    if(finalLoadCSS){
        let cssBundleName = `${build}.css`
        if (static){
            cssBundleName = `static/${page}.css`
        }
        else {
            setTimeout(()=>{
                if (cache.loaders[cssBundleName]){
                    delete cache.loaders[cssBundleName]
                }
            }, 10000)
        }

        cache.loaders[cssBundleName] = finalLoadCSS
        loadBundle += `<link rel="stylesheet" data-lcss href="/_sapsar/loader/${build}.css" />`
        //expire after 10 seconds
        

    }

    if(finalLoadJS){
        let jsBundleName = `${build}.js`
        if (static){
            jsBundleName = `static/${page}.js`
        }
        else {
            setTimeout(()=>{
                if (cache.loaders[jsBundleName]){
                    delete cache.loaders[jsBundleName]
                }
            }, 10000)
        }
        
        cache.loaders[jsBundleName] = finalLoadJS

        loadBundle += `<script data-ljs src="/_sapsar/loader/${build}.js"></script>`
    }




    return `
        ${doctype()}
        ${html(
            head(
                meta({name:"viewport",content:"width=device-width, initial-scale=1.0"}),
                meta({charset:"UTF-8"}),
                `<script data-sapsar>const build = {id: "${build}"}</script>`,
                finalActiveHead,
                handleHead(page),

                // Active stuff
                finalComplexCSS,
                finalComplexJS,

                // Loaded stuff
                loadBundle
            ),
            //final data (with body)
            loadJS.edited,
            {
                lang: "en"
            },
        )}
    `
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
    if (!cache.pageCompilers[page]) {
        // Log.sapsar(`Generating PAGE FUNCTION CACHE for ${page}...`)
        cache.pageCompilers[page] = (await import(`../../../../pages/${page}.js`)).default
    }

    if (!cache.head[page]) {
        // Log.sapsar(`Generating HEAD CACHE for ${page}...`)
        cache.head[page] = ' '
    }

    return;
}



// Compiler Code
async function SapsarCompiler(page, req, res, dynamic=false){
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

                const buildId = createUniqueBuild(res)
                
                const Rendered_Page = await cache.pageCompilers[page](req, buildId, req.params)

                const struct = await renderPageStruct(page, Rendered_Page, buildId, true)

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
                removeBuild(buildId)
                res.end()   
                

                cache.static.pages[path] = finalContent


                // End page render
                // End page caching
                return
            }
        

            try {
                // New page render

                const buildId = createUniqueBuild(res)
                            
                const Rendered_Page = await cache.pageCompilers[page](req, buildId, req.params)

                
                const struct = await renderPageStruct(page, Rendered_Page, buildId)

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
                removeBuild(buildId)
                
                res.end()

            }

            
            catch(err){
                Log.renderError(err)
                

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

        const struct = await renderPageStruct(page, Rendered_Page, buildId)

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

const SAPSAR_CACHE_LOCATION = '../../../../sapsar.json'

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
    CachePage,
    SapsarLoader,
    SapsarTouch,
    building
}


//MaxJ my beloved ☠️
Log.compiler("Sapsar Compiler loaded and ready for action.")