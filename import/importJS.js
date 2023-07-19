const ActiveHead = require("../active/ActiveHead")

/**
 * @description Imports a JS file into your HTML. (Whether it's on a CDN or in the /public directory.)
 * @param {string} src The path to the JS file to import.
 */
function importJS(src=null){
    return ActiveHead(`<script ijs src="${src}"></script>`)
}

module.exports = importJS