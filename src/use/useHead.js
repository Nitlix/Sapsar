const { cache } = require('../util/SapsarCompiler');

async function useHead(page, ...args){    
    const { content } = ParseArgs(args)
    
    if (!cache.head[page]) cache.head[page] = ' ';

    cache.head[page] += content;
    return;
}

module.exports = useHead;