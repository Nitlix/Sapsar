const { setProductionStatus } = require("../util/SapsarCompiler");

function useProduction(status=true){
    if (typeof status === 'boolean'){
        setProductionStatus(status);
    }
    else {
        throw new Error("useProduction() expects a boolean as a parameter.")
    }
}

module.exports = useProduction;