const { cache } = require('../util/SapsarCompiler');

async function reportJS(page='index', js=[]){
    if (cache.reports.js[page] == undefined) cache.reports.js[page] = []

    js.forEach(component => {
        cache.reports.js[page].push(component)
    })
}

module.exports = reportJS;