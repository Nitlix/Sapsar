const { cache, getBuildStatus } = require('../util/SapsarCompiler.js');
const SapsarVyrbo = require('../util/SapsarVyrbo.js');

async function useVyrbo(path, preferredStore=path) {
    if (getBuildStatus()) {
        const code = await SapsarVyrbo(path)
        
        if (preferredStore === '*') {
            cache.js['*'] += code
        } else {
            cache.js[preferredStore] = code
        }
        return;
    }
    return;
}


module.exports = useVyrbo;