const { addProcess } = require("../util/ActiveBuild.js")

function ActiveRender(func, args, build){
    addProcess(
        build,
        async ()=> {
            const renderedContent = JSON.stringify(await func(args))
            return `<script data-sapsar-amrender>d=document;amr_${build}={ctx:${renderedContent},fc:()=>{for(x in amr_${build}.ctx)d.querySelector(x).innerHTML=amr_${build}.ctx[x]}};try{"loading"!=d.readyState?amr_${build}.fc():d.addEventListener("DOMContentLoaded",amr_${build}.fc)}catch(e){}</script>`
        }
    )
}

module.exports = ActiveRender;