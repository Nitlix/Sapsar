const { cache, getBuildStatus, getProductionStatus } = require('../util/SapsarCompiler');

const getFileModel = require('../util/getFileModel');
const CSS_FOLDER = 'styles'


const CleanCSS = require('clean-css');
const CSSOptimiser = new CleanCSS({});


async function useCSS(path, global=false){
    if (getBuildStatus()) {
        
        const production = getProductionStatus();
        let code;
        if (production){
            code = CSSOptimiser.minify(await getFileModel(path, CSS_FOLDER)).styles
        }
        else {
            code = await getFileModel(path, CSS_FOLDER)
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





module.exports = useCSS