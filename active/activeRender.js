const { addProcess } = require("../util/ActiveBuild")
const { genChars } = require("../util/Random")

/**
 * @param {function} func Function to execute which should return an object with keys as HTML selectors, and values as HTML content to replace them with.
 * @param {any} args Arguments to pass to the function.
 * @description This function is used to return HTML content after your initial content has been streamed to the client, meaning that if there is content which takes time to load, you can use this to replace it manually. The function returns an ActiveBuild component import, which you must include in your page for the component to work.
 */
function ActiveRender(func, args){
    const rand = genChars(10)
    const name = addProcess(
        async () => {
            const renderedContent = JSON.stringify(await func(args))
            return `<script data-sapsar-arender>d=document;ar_${rand}={ctx:${renderedContent},fc:()=>{for(x in ar_${rand}.ctx)d.querySelector(x).innerHTML=ar_${rand}.ctx[x]}};try{"loading"!=d.readyState?ar_${rand}.fc():d.addEventListener("DOMContentLoaded",ar_${rand}.fc)}catch(e){}</script>`
        }
    )
    
    return `;ActiveBuild;${name};/ActiveBuild;`
}

module.exports = ActiveRender;