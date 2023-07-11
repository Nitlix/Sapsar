const { cache } = require('../util/SapsarCompiler');

async function reportCSS(page='index', css=[]){
    if (!cache.reports.css[page]) cache.reports.css[page] = []

    css.forEach(component => {
        cache.reports.css[page].push(component)
    })
}

module.exports = reportCSS