const { cache } = require('../util/SapsarCompiler');

async function useHead(...args){    
    const { content, props } = ParseArgs(args)

    if (!props.page) throw new Error('At useHead: a page is not referenced in props.');
    if (!cache.head[page]) cache.head[page] = ' ';

    cache.head[props.page] += content;
    return;
}

module.exports = useHead;