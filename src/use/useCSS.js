const { cache, getBuildStatus, getProductionStatus } = require('../util/SapsarCompiler');

const getFileModel = require('../util/getFileModel');
const CSS_FOLDER = 'styles'


const CleanCSS = require('clean-css');
const CSSOptimiser = new CleanCSS({});


async function useCSS(path, global=false){
    if (getBuildStatus()) {
        const production = getProductionStatus();
        let code;
        let css;

        //manual css
        if (path.startsWith("!MCSS")) {
            //if it does, then it's just css code, not a path
            css = path.replace("!MCSS", "")
        }
        else {
            css = await getFileModel(path, CSS_FOLDER)
        }
        
        if (production){
            code = CSSOptimiser.minify(css).styles
        }
        else {
            code = css
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