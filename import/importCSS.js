const ActiveHead = require("../active/ActiveHead")

/**
 * @description Imports a CSS file into your HTML. (Whether it's on a CDN or in the /public directory.)
 * @param {string} src The path to the CSS file to import.
 */
function importCSS(src=null){
    return ActiveHead(`<link icss rel="stylesheet" href="${src}">`)
}

module.exports = importCSS