const { cache, getBuildStatus } = require('../util/SapsarCompiler');
const SapsarVyrbo = require('../util/SapsarVyrbo');
const JS_FOLDER = 'scripts';

async function useVyrbo(path, component = "*") {
    if (getBuildStatus()) {
        const code = await SapsarVyrbo(JS_FOLDER + "/" + path)
        
        if (component == "*") {
            cache.js['*'] += code
        } else {
            cache.js[component] = code
        }
        return;
    }
    return;
}


module.exports = useVyrbo;