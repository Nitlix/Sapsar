const { cache } = require('../util/SapsarCompiler');

/**
    * @param {string} page The page of the report (without ".js" and with the path relative to the "pages" folder).
    * @param {string} component The JS component path/name to report.
    * @description This function is used to report a JS component to the compiler, so that it can be loaded using "ActiveJS" on the page.
*/
function reportJS(page='index', component){
    if (!cache.reports.js[page]) cache.reports.js[page] = []
    cache.reports.js[page].push(component)
}

module.exports = reportJS;