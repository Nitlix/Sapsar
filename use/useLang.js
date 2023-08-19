const { cache } = require('../util/SapsarCompiler');

/**
 * Sets a language parameter to the HTML element on certain pages. 
 * @param {*} lang The language to set.
 * @param {*} page The page to set the language on (Use * for all pages).
 */
function useLang(lang, page="*"){
    cache.lang[page] = lang;
    return lang;
}       

module.exports = useLang;