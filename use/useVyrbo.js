const { cache, getBuildStatus, SlotComponent } = require('../util/SapsarCompiler');
const SapsarVyrbo = require('../util/SapsarVyrbo');

async function useVyrbo(path, preferredStore=path) {
    if (getBuildStatus()) {
        const code = await SapsarVyrbo(path)
        
        if (preferredStore === '*') {
            cache.js['*'] += code
        } else {
            cache.js[preferredStore] = code
        }
        
        SlotComponent(preferredStore)

        return preferredStore;
    }
    return preferredStore;
}


module.exports = useVyrbo;