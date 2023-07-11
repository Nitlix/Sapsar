const { cache, getBuildStatus, getProductionStatus } = require('../util/SapsarCompiler');
const UglifyJS = require('uglify-js');
const getFileModel = require('../util/getFileModel');
const JS_FOLDER = 'scripts';


async function useJS(path, preferredStore=path) {
    if (getBuildStatus()) {
        const production = getProductionStatus();
        let code;
        if (production){
            code = UglifyJS.minify(await getFileModel(path, JS_FOLDER)).code;
        }
        else {
            code = await getFileModel(path, JS_FOLDER);
        }

        if (preferredStore === '*') {
            cache.js['*'] += code;
        } else {
            cache.js[preferredStore] = code;
        }
        return;
    }
    return;
}


module.exports = useJS;