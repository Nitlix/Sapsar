/**
    * @param {string} JS Component path/name to load.
    * @return {string} Returns a compiler-readable syntax string.
    * @description This function is used to load a JS component from a seperate bundle which will be imported from the page, to make sure the document size remains minimal.
*/
function LoadJS(component) {
    return `;LoadJS;${component};/LoadJS;`
}

module.exports = LoadJS;