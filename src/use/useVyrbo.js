const { cache, getBuildStatus } = require('../util/SapsarCompiler');
const SapsarVyrbo = require('../util/SapsarVyrbo');
const JS_FOLDER = 'scripts';

async function useVyrbo(path, global=false) {
    if (getBuildStatus()) {
        const code = await SapsarVyrbo(JS_FOLDER + "/" + path)
        
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