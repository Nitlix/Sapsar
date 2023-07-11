const { addProcess } = require("../util/ActiveBuild")

/**
 * @param {function} func Function to execute which should return plain HTML like your strings.
 * @param {string} selector HTML selector that will be used to render the content.
 * @param {any} args Arguments to pass to the function.
 * @param {string} build Build ID passed down to your page to use for this render.
 * @description This function is used to return HTML content after your initial content has been streamed to the client, meaning that if there is content which takes time to load, you can use this to replace it manually.
*/
function ActiveRender(func, selector, args, build){
    addProcess(
        build,
        async ()=>{
            const renderedContent = await func(args)
            return "<script data-sapsar-arender>content="+ren+";selector='"+selector+"';try{'loading'!=document.readyState?document.querySelector(selector).innerHTML=content:document.addEventListener('DOMContentLoaded',document.querySelector(selector).innerHTML=content)}catch(e){}</script>"
        }
    )
}

module.exports = ActiveRender;