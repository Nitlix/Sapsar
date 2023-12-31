const { cache, getProductionStatus, genRandomModal } = require('../util/SapsarCompiler');

const CleanCSS = require('clean-css');
const CSSOptimiser = new CleanCSS({});

/**
 * @param {function} code The code to use as your CSS component.
 * @param {string} preferredStore Compulsory name of the store to store the CSS in. (If you want to store it globally, use "*".) (If you want a random name, use "!".)
 * @returns {string} The name of the CSS component that was stored, so you can then import it using ActiveCSS() or LoadCSS(). 
 * @description The backbone for your styles. Your styles are imported and stored for production, and can be imported in any way using other functions.
 */
function useMCSS(code, preferredStore="!") {
    if (getProductionStatus()){
        code = CSSOptimiser.minify(code).styles
    }

    //random name
    if (preferredStore === "!"){
        preferredStore = genRandomModal("css");
    }

    if (preferredStore === '*') {
        cache.css['*'] += code;
    } else {
        cache.css[preferredStore] = code;
    }
    
    return preferredStore;
}


module.exports = useMCSS;