const { cache } = require('./SapsarCompiler');
const Log = require('./Log');
const { genChars}  = require('./Random')




async function CachePage(page) {
    if (!cache.pageCompilers[page]) {
        // Log.sapsar(`Generating PAGE FUNCTION CACHE for ${page}...`)
        cache.pageCompilers[page] = (await import(`../../../../pages/${page}.js?query=${genChars(12)}`)).default
    }

    if (!cache.head[page]) {
        // Log.sapsar(`Generating HEAD CACHE for ${page}...`)
        cache.head[page] = ' '
    }

    return;
}

module.exports = CachePage;