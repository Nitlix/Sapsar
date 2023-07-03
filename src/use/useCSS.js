const { cache, getBuildStatus, getProductionStatus } = require('../util/SapsarCompiler');

const getFileModel = require('../util/getFileModel');
const CSS_FOLDER = 'styles'


const CleanCSS = require('clean-css');
const CSSOptimiser = new CleanCSS({});


async function useCSS(path, component="*"){
    const production = getProductionStatus();
    console.log(production)
    if (getBuildStatus()) {
        if (component == "*"){
            if (production){
                cache.css['*'] += CSSOptimiser.minify(await getFileModel(path, CSS_FOLDER)).styles
            }
            else {
                cache.css['*'] += await getFileModel(path, CSS_FOLDER)
            }
        }
        else {
            if (production){
                cache.css[component] = CSSOptimiser.minify(await getFileModel(path, CSS_FOLDER)).styles
            }
            else {
                cache.css[component] = await getFileModel(path, CSS_FOLDER)
            }
        }
        return;
    }
    return;
}





module.exports = useCSS