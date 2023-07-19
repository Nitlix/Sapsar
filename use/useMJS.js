const { cache, getBuildStatus, getProductionStatus } = require('../util/SapsarCompiler');
const UglifyJS = require('uglify-js');
const getFileModel = require('../util/getFileModel');
const JS_FOLDER = 'scripts';

/**
 * @param {string} code The code to use as your JS component.
 * @param {string} preferredStore Compulsory name of the store to store the JS in. (If you want to store it globally, use "*".)
 * @returns {string} The name of the JS component that was stored, so you can then import it using ActiveJS() or LoadJS(). 
 * @description The backbone for your scripts. Your scripts are imported and stored for production, and can be imported in any way using other functions.
 */
async function useJS(code, preferredStore="*") {
    if (getBuildStatus()) {
        const production = getProductionStatus();

        let finalCode = code.toString().substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

        if (production){
            finalCode = UglifyJS.minify(code).code;
        }

        if (preferredStore === '*') {
            cache.js['*'] += finalCode;
        } else {
            cache.js[preferredStore] = finalCode;
        }
        
        return preferredStore;
    }
    return preferredStore;
}


module.exports = useJS;