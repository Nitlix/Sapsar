/**
    * @param {string} CSS Component path/name to insert.
    * @return {string} Returns a compiler-readable syntax string.
    * @description This function is used to rapidly insert a CSS component into the head element of your page.
*/
function ActiveCSS(component) {
    return `;ActiveCSS;${component};/ActiveCSS;`
}

module.exports = ActiveCSS;