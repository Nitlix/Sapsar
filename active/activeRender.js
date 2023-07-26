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
            return "<script data-sapsar-arender>content="+JSON.stringify([await func(args)])+";selector='"+selector+"';try{'loading'!=document.readyState?document.querySelector(selector).innerHTML=content[0]:document.addEventListener('DOMContentLoaded',document.querySelector(selector).innerHTML=content[0])}catch(e){}</script>"
        }
    )
}

module.exports = ActiveRender;