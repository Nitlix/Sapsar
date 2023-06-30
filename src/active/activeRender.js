const { addProcess } = require("../util/ActiveBuild")

function ActiveRender(func, selector, args, build){
    addProcess(
        build,
        async ()=>{
            const renderedContent = await func(args)
            return "<script data-sapsar-ActiveRender>content=`"+renderedContent+"`;selector='"+selector+"';try{'loading'!=document.readyState?document.querySelector(selector).innerHTML=content:document.addEventListener('DOMContentLoaded',document.querySelector(selector).innerHTML=content)}catch(e){}</script>"
        }
    )
}

module.exports = ActiveRender;