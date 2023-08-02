const { cache, getProductionStatus, genRandomModal } = require('../util/SapsarCompiler');
const UglifyJS = require('uglify-js');

/**
 * @param {function} code The code to use as your JS component.
 * @param {string} preferredStore Compulsory name of the store to store the JS in. (If you want to store it globally, use "*".) (If you want a random name, use "!".)
 * @returns {string} The name of the JS component that was stored, so you can then import it using ActiveJS() or LoadJS(). 
 * @description The backbone for your scripts. Your scripts are imported and stored for production, and can be imported in any way using other functions.
 */
function useMJS(code, preferredStore="!") {
    code = code.toString();
    code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}")).toString();

    //random name
    if (preferredStore === "!"){
        preferredStore = genRandomModal("js");
    }

    if (getProductionStatus()){
        code = UglifyJS.minify(code).code;
    }

    if (preferredStore === '*') {
        cache.js['*'] += code;
    } else {
        cache.js[preferredStore] = code;
    }
    
    return preferredStore;
}


module.exports = useMJS;