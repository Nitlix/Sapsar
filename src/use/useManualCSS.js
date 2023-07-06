const { cache, getBuildStatus, getProductionStatus } = require('../util/SapsarCompiler');

const CleanCSS = require('clean-css');
const CSSOptimiser = new CleanCSS({});


async function useManualCSS(code, path, global=false){
    if (getBuildStatus()) {
        
        const production = getProductionStatus();
        if (production){
            code = CSSOptimiser.minify(code).styles
        }

        if (global){
            cache.css['*'] += code
        }
        else {
            cache.css[path] = code
        }

        return;
    }
    return;
}





module.exports = useManualCSS