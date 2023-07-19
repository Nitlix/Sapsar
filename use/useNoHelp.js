const { cache } = require("../util/SapsarCompiler")

function useNoHelp(page){
    cache.custom.noHelp.push(page)
    return page;
}

module.exports = useNoHelp;