const { cache } = require('../util/SapsarCompiler');

/**
    * @param {string} page The page of the report (without ".js" and with the path relative to the "pages" folder).
    * @param {string} component The CSS component path/name to report.
    * @description This function is used to report a CSS component to the compiler, so that it can be loaded using "ActiveCSS" on the page.
*/
function reportCSS(page='index', component){
    if (!cache.reports.css[page]) cache.reports.css[page] = []
    cache.reports.css[page].push(component)
}

module.exports = reportCSS