const { cache } = require('../util/SapsarCompiler');

async function useHead(page, settings){    
    if (!cache.head[page]) cache.head[page] = ' ';

    cache.head[page] += settings;
    return true
}

module.exports = useHead;