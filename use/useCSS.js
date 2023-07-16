const { cache, getBuildStatus, getProductionStatus, SlotComponent } = require('../util/SapsarCompiler');

const getFileModel = require('../util/getFileModel');
const CSS_FOLDER = 'styles'


const CleanCSS = require('clean-css');
const CSSOptimiser = new CleanCSS({});

/**
 * @param {string} path The path to the CSS file to use as your CSS component relative to the "styles" folder. (Alternatively, if the string starts with "!MCSS", then it will be treated as CSS code instead of a path.)
 * @param {string} preferredStore It is your provided path by default, so it doesn't have to be used. The name of the store to store the CSS in. (If you want to store it globally, use "*".)
 * @returns {string} The name of the CSS component that was stored, so you can then import it using ActiveCSS() or LoadCSS(). 
 * @description The backbone for your styles. Your styles are imported and stored for production, and can be imported in any way using other functions.
 */
async function useCSS(path, preferredStore=path){
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
    

        if (preferredStore === '*'){
            cache.css['*'] += code
        }
        else {
            cache.css[preferredStore] = code
        }

        SlotComponent(preferredStore)
        
        return preferredStore;
    }
    return preferredStore;
}





module.exports = useCSS