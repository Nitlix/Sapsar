const { doctype, head, html, body, meta, style, manualScript } = require("sapsar/base")

const Log = require("./Log")
const SapsarErrorPage = require("./SapsarErrorPage")
const ShipTouch = require("../touch/ShipTouch")

const getComplexLevel = require("./getComplexLevel")
const { createUniqueBuild, getBuildProcesses, removeBuild } = require("./ActiveBuild")


const cacheFormat = {
    css: {
        '*': ''
    },
    js: {
        '*': ''
    },


    pageCompilers: {

    },
    head: {
        '*': ' '
    },
    
    touch: {

    },

    static: {
        pages: {},
        useQueries: [],
        requests: []
    },

    404: null
}







function handleHead(page){
    let content = ""

    if (cache.touch[page]){
        content += ShipTouch('http://localhost', 3000)
    }

    if (cache.head[page] != undefined){
        content += cache.head[page]
    }

    if (cache.head['*'] != undefined){
        content += cache.head['*']
    }


    return content
}



let cache = JSON.parse(JSON.stringify(cacheFormat))







 function clearCacheData(){
    cache = JSON.parse(JSON.stringify(cacheFormat))
}


function addComplexCSS(component){
    if (cache.css[component]){
        return style(
            cache.css[component]
        )
    }
    else {
        return ""
    }
}



async function renderPageStruct(page, content, build){

    const complexCSS = getComplexLevel(content, ';ActiveCSS;', ';/ActiveCSS;')
    let finalComplexCSS = ""
    for (let x = 0; x < complexCSS.content.length; x++) {
        finalComplexCSS += addComplexCSS(complexCSS.content[x])
    }

    const activeHeadData = getComplexLevel(complexCSS.edited, ';ActiveHead;', ';/ActiveHead;')
    let finalActiveHead = ""
    for (let x = 0; x < activeHeadData.content.length; x++) {
        finalActiveHead += activeHeadData.content[x]
    }

    

    return `
        ${doctype()}
        ${html(
            head(
                meta({name:"viewport",content:"width=device-width, initial-scale=1.0"}),
                meta({charset:"UTF-8"}),
                handleHead(page),
                finalComplexCSS,
                finalActiveHead,
                `<script data-sapsar>
                    const build = {id: "${build}"}
                </script>`
            ),
            body(
                activeHeadData.edited
            ),
            {
                lang: "en"
            },
        )}
    `
}





// Compiler Code
async function SapsarCompiler(page, req, res, dynamic=false){
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
    
        // import page
        if (!cache.pageCompilers[page]) {
            Log.compiler(`Generating PAGE FUNCTION CACHE for ${page}...`)
            try {
                cache.pageCompilers[page] = (await import(`../../../../pages/${page}.js`)).default
            }
            catch(e){
                Log.buildError(`Error trying to build page: ${page}`)
                res.status(400).end(SapsarErrorPage(
                    `Something went wrong caching page function: ${page}`, 
                    e.name,
                    e.message,
                    e.stack
                ))
            }
        }



        if (!cache.head[page]) {
            Log.compiler(`Generating HEAD CACHE for ${page}...`)
            cache.head[page] = ' '
        }




        // Static page 

        if (cache.static.requests.includes(page)){
            let finalContent = ""

            Log.compiler(`Generating STATIC PAGE CACHE for ${page}...`)
            
            const Rendered_Page = await cache.pageCompilers[page](req, buildId, req.params)

            const struct = await renderPageStruct(page, Rendered_Page, buildId)

            res.write(struct)
            finalContent += struct


            //post render
            //run active build scripts

            

            let activeBuildProcesses = getBuildProcesses(buildId)
            for (let x = 0; x < activeBuildProcesses.length; x++) {
                let processData = activeBuildProcesses[x]

                res.write(await processData.process(processData.args))
                finalContent += struct;
            }

            // everything executed
            // ending response
            removeBuild(buildId)
            
            res.end()

            
            cache.static.pages[path] = struct


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

            const stack = err.stack.split("at SapsarCompiler")[0]


            res.status(400).end(
                SapsarErrorPage(`Error while rendering page: ${page}`, err.name, err.message, stack)
            )
        }


    }
}




async function SapsarUnknownPageHandler(page){
    if (cache['404']){

    }
    else {
        const struct = SapsarErrorPage(
            `Page <b>${page}</b> not found`,
            "Error 404",
            "Page not found",
            `Try re-checking your app's page files, and seeing if the one you're looking for exists, or simply try relaunching your app.
            
            Want a custom 404 error page? Create a file called <b>_404.js</b> in your <b>pages</b> folder, and export a simple page function with two inputs: <b>data</b> and <b>page</b>.
            `
        )
        
        return struct
    }
}

// export compiler (as default) and cache

module.exports = {
    SapsarCompiler,
    SapsarUnknownPageHandler,
    cache,
    clearCacheData
}


//MaxJ my beloved ☠️
Log.compiler("Sapsar Compiler loaded and ready for action.")