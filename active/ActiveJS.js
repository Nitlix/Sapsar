
/**
 * @param {string} JS Component path/name to insert.
 * @return {string} Returns a compiler-readable syntax string.
 * @description This function is used to rapidly insert a JS component into the head element of your page.
 */
function ActiveJS(component) {
    return `;ActiveJS;${component};/ActiveJS;`
}

module.exports = ActiveJS;