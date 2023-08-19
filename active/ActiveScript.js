const { addProcess } = require("../util/ActiveBuild")
/**
 * @param {function} func Function to execute, everything that is returned will be streamed to the client.
 * @param {any} args Arguments to pass to the function.
 * @description This function is used to return HTML content (or anything else, since your function can return anything) after your initial content has been streamed to the client, meaning that if there is content which takes time to load, you can use this to replace it manually.
 */
function ActiveScript(func, args){
    const name = addProcess(
        func,
        args
    )
    return `;ActiveBuild;${name};/ActiveBuild;`
}

module.exports = ActiveScript;