const { cache } = require('../util/SapsarCompiler')


async function useActiveHead(page, settings){    
    if (!cache.activeHead[page]) cache.activeHead[page] = ' ';
    cache.activeHead[page] += settings;
    return true
}

module.exports = useActiveHead;