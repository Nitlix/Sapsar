const { cache } = require('../util/SapsarCompiler');
const ParseArgs = require('../basic/ParseArgs');

/**
 * @param {string} content The content to put in the head. This acts like a normal-behaving sapsar element.
 * Please note that the prop "page" (without ".js" but with a path relative to "pages") is required.
 * @description This function is used to cache the content stored in the <head> for a certain page all the time.
 */
async function useHead(...args){    
    const { content, props } = ParseArgs(args)

    if (!props.page) throw new Error('At useHead: a page is not referenced in props.');
    if (!cache.head[props.page]) cache.head[props.page] = '';

    cache.head[props.page] += content;
    return;
}

module.exports = useHead;