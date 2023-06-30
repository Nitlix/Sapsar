const { cache } = require('../util/SapsarCompiler')

function useStaticPage(page){
    cache.static.requests.push(page);
    return true;
}

module.exports = useStaticPage;