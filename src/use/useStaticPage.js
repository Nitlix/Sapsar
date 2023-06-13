const { cache } = require('../util/SapsarCompiler')



async function useStaticPage(page){
    cache.staticPageRequests.push(page);
    return true;
}

module.exports = useStaticPage;