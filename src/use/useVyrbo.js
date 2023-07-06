const { cache, getBuildStatus } = require('../util/SapsarCompiler');
const SapsarVyrbo = require('../util/SapsarVyrbo');

async function useVyrbo(path, global=false) {
    if (getBuildStatus()) {
        const code = await SapsarVyrbo(path)
        
        if (global) {
            cache.js['*'] += code
        } else {
            cache.js[path] = code
        }
        return;
    }
    return;
}


module.exports = useVyrbo;