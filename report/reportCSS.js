const { cache } = require('../util/SapsarCompiler');

function reportCSS(page='index', cssPath){
    if (!cache.reports.css[page]) cache.reports.css[page] = []
    cache.reports.css[page].push(cssPath)
}

module.exports = reportCSS