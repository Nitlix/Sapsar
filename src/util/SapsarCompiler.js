const { doctype, head, html, body, meta, style } = require("sapsar/base")

const Log = require("./Log")
const SapsarErrorPage = require("./SapsarErrorPage")
const ShipTouch = require("../touch/ShipTouch")

const getComplexLevel = require("./getComplexLevel")


const cacheFormat = {
    css: {
        global: ''
    },
    js: {

    },


    layout: null,
    pageCompilers: {

    },
    head: {
        '*': ' '
    },
    activeHead: {
        
    },
    reports: {
        css: {
            '*': []
        }
    },
    pages: {

    },
    staticPageRequests: [],

    touch: {

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

    if (cache.activeHead[page] != undefined){
        content += cache.activeHead[page]
    }

    if (cache.head['*'] != undefined){
        content += cache.head['*']
    }


    return content
}



let cache = JSON.parse(JSON.stringify(cacheFormat))





function handleCSS(page){
    let struct = ''

    for (let x = 0; x < cache.reports.css[page].length; x++){
        let component = cache.reports.css[page][x]

        if (cache.css[component] != undefined){
            struct += style(
                cache.css[component],
                {
                    "data-sapsar-component": component
                }
            )
        }
    }

    for (let x = 0; x < cache.reports.css['*'].length; x++){
        let component = cache.reports.css['*'][x]

        if (cache.css[component] != undefined){
            struct += style(
                cache.css[component],
                {
                    "data-sapsar-component": component
                }
            )
        }
    }


    return struct
}



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



async function renderPageStruct(page, content){

    const complexCSS = getComplexLevel(content, ';levelCSS;', ';/levelCSS;')
    let finalComplexCSS = ""
    for (let x = 0; x < complexCSS.content.length; x++) {
        finalComplexCSS += addComplexCSS(complexCSS.content[x])
    }

    

    return `
        ${doctype()}
            ${html(
                head(
                    meta({name:"viewport",content:"width=device-width, initial-scale=1.0"}),
                    meta({charset:"UTF-8"}),
                    handleHead(page),
                    handleCSS(page),
                    finalComplexCSS
                ),
                body(
                    complexCSS.edited
                ),
                {
                    lang: "en"
                },
            )}
    `
}





// Compiler Code
async function SapsarCompiler(page, data){
    if (!cache.pages[page]) {

        let staticPage = false;

        // import layout
        if (!cache.layout) {
            Log.compiler(`Generating LAYOUT CACHE for (${page})...`)
            cache.layout = (await import(`../../../../pages/_layout.js`)).default
        }

        // import page
        if (!cache.pageCompilers[page]) {
            Log.compiler(`Generating PAGE FUNCTION CACHE for ${page}...`)

            try {
                cache.pageCompilers[page] = (await import(`../../../../pages/${page}.js`)).default
            }
            catch(e){
                Log.buildError(`Error trying to build page: ${page}`)
                return SapsarErrorPage(
                    `Something went wrong caching page: ${page}`, 
                    e.name,
                    e.message,
                    e.stack
                )
            }
        }

        if (cache.staticPageRequests.includes(page)) {
            staticPage = true;
        }


        // //import component cache

        // if (!cache.components[page]) {
        //     Log.compiler(`Generating COMPONENT CACHE for ${page}...`)
        //     cache.components[page] = {}
        // }
        
        //import head cache

        if (!cache.head[page]) {
            Log.compiler(`Generating HEAD CACHE for ${page}...`)
            cache.head[page] = ' '
        }

        //import active head cache

        if (!cache.activeHead[page]) {
            Log.compiler(`Generating ACTIVE HEAD CACHE for ${page}...`)
            cache.activeHead[page] = ' '
        }
        
        // generate css report
        if (!cache.reports.css[page]) {
            Log.compiler(`Generating CSS REPORT for ${page}...`)
            cache.reports.css[page] = []
        }







        let struct = null;

        if (staticPage){
            Log.compiler(`Generating STATIC PAGE CACHE for ${page}...`)
            const Rendered_Page = await cache.pageCompilers[page](data)
            struct = await renderPageStruct(page, Rendered_Page)

            cache.pages[page] = struct

            return struct
        }
        else {
            //rendering page
                
            try {
                const Rendered_Page = await cache.pageCompilers[page](data)
                const struct = await renderPageStruct(page, Rendered_Page)


                //delete active data
                cache.activeHead[page] = ' '

                return struct


            }
            catch(err){
                Log.renderError(err)
                

                //dispay error page

                const stack = err.stack.split("at SapsarCompiler")[0]


                return SapsarErrorPage(`Error while rendering page: ${page}`, err.name, err.message, stack)
            }
            
        }





    }

    else {
        // returned cached page
        return cache.pages[page]
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

Log.compiler("Sapsar Compiler loaded and ready for action.")
