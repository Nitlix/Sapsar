const { addProcess } = require("../util/ActiveBuild")

/**
 * @param {function} func Function to execute which should return an object with keys as HTML selectors, and values as HTML content to replace them with.
 * @param {any} args Arguments to pass to the function.
 * @param {string} build Build ID passed down to your page to use for this render.
 * @description This function is used to return HTML content after your initial content has been streamed to the client, meaning that if there is content which takes time to load, you can use this to replace it manually.
 */
function ActiveMultiRender(func, args, build){
    addProcess(
        build,
        async ()=> {
            const renderedContent = JSON.stringify(await func(args))
            return `<script data-sapsar-amrender>d=document;amr_${build}={ctx:${renderedContent},fc:()=>{for(x in amr_${build}.ctx)d.querySelector(x).innerHTML=amr_${build}.ctx[x]}};try{"loading"!=d.readyState?amr_${build}.fc():d.addEventListener("DOMContentLoaded",amr_${build}.fc)}catch(e){}</script>`
        }
    )
}

module.exports = ActiveMultiRender;