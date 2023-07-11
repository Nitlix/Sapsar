const { cache, getBuildStatus, getProductionStatus } = require('../util/SapsarCompiler');

const getFileModel = require('../util/getFileModel');
const SASS_FOLDER = 'styles'


const sass = require('sass');



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
        return;
    }
    return;
}





module.exports = useSASS