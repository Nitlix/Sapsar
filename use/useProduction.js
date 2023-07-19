const { setProductionStatus } = require("../util/SapsarCompiler");

/**
 * @param {boolean} status Whether to use production mode or not. (Default: true)
 * @description Sets the production status of your app. (If you're using production mode, your app will be minified and compressed.)
 */
function useProduction(status=true){
    if (typeof status === 'boolean'){
        setProductionStatus(status);
    }
    else {
        throw new Error("useProduction() expects a boolean as a parameter.")
    }
}

module.exports = useProduction;