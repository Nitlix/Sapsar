const { cache } = require('../util/SapsarCompiler')

function useStaticPage(page){
    cache.staticPageRequests.push(page);
    return true;
}

module.exports = useStaticPage;