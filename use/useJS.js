const { cache, getBuildStatus, getProductionStatus } = require('../util/SapsarCompiler');
const UglifyJS = require('uglify-js');
const getFileModel = require('../util/getFileModel');
const JS_FOLDER = 'scripts';

/**
 * @param {string} path The path to the JS file to use as your JS component relative to the "scripts" folder.
 * @param {string} preferredStore It is your provided path by default, so it doesn't have to be used. The name of the store to store the JS in. (If you want to store it globally, use "*".)
 * @returns {string} The name of the JS component that was stored, so you can then import it using ActiveJS() or LoadJS(). 
 * @description The backbone for your scripts. Your scripts are imported and stored for production, and can be imported in any way using other functions.
 */
async function useJS(path, preferredStore=path) {
    if (getBuildStatus()) {
        const production = getProductionStatus();
        let code = await getFileModel(path, JS_FOLDER);    
            
        if (production){
            code = UglifyJS.minify(code).code;
        }

        if (preferredStore === '*') {
            cache.js['*'] += code;
        } else {
            cache.js[preferredStore] = code;
        }
        
        return preferredStore;
    }
    return preferredStore;
}


module.exports = useJS;