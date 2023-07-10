const { cache } = require('../util/SapsarCompiler.js');

function useStaticPage(page){
    cache.static.requests.push(page);
    return true;
}

module.exports = useStaticPage;