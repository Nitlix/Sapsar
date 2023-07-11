/**
    * @param {string} CSS Component path/name to load.
    * @return {string} Returns a compiler-readable syntax string.
    * @description This function is used to load a CSS component from a seperate bundle which will be imported from the page, to make sure the document size remains minimal.
*/
function LoadCSS(component) {
    return `;LoadCSS;${component};/LoadCSS;`
}

module.exports = LoadCSS;