const { getHTML } = require("../util/SapsarCompiler");

/**
 * @param {function} component The HTML component name to insert.
 * @returns {string} The HTML of the component.
 * @description Your HTML is imported and stored for production (mostly from markdowns), and can be inserted into the DOM using this function.
 */
function insertHTML(component){
    return getHTML(component);
}

module.exports = insertHTML;