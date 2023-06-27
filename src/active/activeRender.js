const { addProcess } = require("../util/ActiveBuild")

function activeRender(func, selector, args, build){
    addProcess(
        build,
        ()=>{
            const renderedContent = func(args)
            return "<script data-sapsar-activeRender> try{'loading'!=document.readyState?document.querySelector(" + selector + ").innerHTML='"+renderedContent+"':document.addEventListener('DOMContentLoaded',document.querySelector('"+selector+"').innerHTML='"+renderedContent+"')}catch(e){}</script>"
        }
    )
}

module.exports = activeRender;