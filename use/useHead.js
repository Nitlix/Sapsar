const { cache } = require('../util/SapsarCompiler');
const ParseArgs = require('../basic/ParseArgs');

async function useHead(...args){    
    const { content, props } = ParseArgs(args)

    if (!props.page) throw new Error('At useHead: a page is not referenced in props.');
    if (!cache.head[props.page]) cache.head[props.page] = '';

    cache.head[props.page] += content;
    return;
}

module.exports = useHead;