const ParseArgs = require('../basic/ParseArgs.js')

/**
    * @param {string} Content to insert.
    * @return {string} Returns a compiler-readable syntax string.
    * @description This function is used to rapidly insert given content into your pages head element.
*/
function ActiveHead(...args) {
    const { content } = ParseArgs(args)
    return `;ActiveHead;${content};/ActiveHead;`
}

module.exports = ActiveHead;