const { cache, getBuildStatus, getProductionStatus } = require('../util/SapsarCompiler');

const getFileModel = require('../util/getFileModel');
const SASS_FOLDER = 'styles'


const sass = require('sass');


/**
 * @param {string} path The path to the SCSS/SASS file to use as your CSS component relative to the "styles" folder.
 * @param {string} preferredStore It is your provided path by default, so it doesn't have to be used. The name of the store to store the CSS in. (If you want to store it globally, use "*".)
 * @returns {string} The name of the CSS component that was stored, so you can then import it using ActiveCSS() or LoadCSS(). 
 * @description The backbone for your styles. Your styles are imported and stored for production, and can be imported in any way using other functions.
 */
async function useSASS(path, preferredStore=path){
    if (getBuildStatus()) {
        
        const production = getProductionStatus();
        let code;
    
        if (production){
            code = sass.compileString(await getFileModel(path, SASS_FOLDER), {style: "compressed"}).css.toString()
        }
        else {
            code = sass.compileString(await getFileModel(path, SASS_FOLDER), {style: "expanded"}).css.toString()
        }

        if (preferredStore === '*'){
            cache.css['*'] += code
        }
        else {
            cache.css[preferredStore] = code
        }
        return preferredStore;
    }
    return preferredStore;
}





module.exports = useSASS