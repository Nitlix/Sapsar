const { cache } = require('../util/SapsarCompiler');

/**
 * @param {*} page The page path to cache (without ".js" but with a path relative to "pages") 
 * @description Used to tell the compiler to return a certain page in the same way all the time, so it doesn't have to be re-rendered.
 * UNSTABLE: So not recommended in production.
 */
function useStaticPage(page){
    cache.static.requests.push(page);
    return true;
}

module.exports = useStaticPage;