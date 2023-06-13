const { cache } = require("../util/SapsarCompiler");


async function useTouch(page){
    cache.touch[page] = true;
    return true;
}

module.exports = useTouch;
