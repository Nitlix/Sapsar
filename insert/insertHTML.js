const { getHTML } = require("../util/SapsarCompiler");

function insertHTML(component){
    return getHTML(component);
}

module.exports = insertHTML;