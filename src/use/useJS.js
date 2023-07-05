const { cache, getBuildStatus } = require('../util/SapsarCompiler');
const UglifyJS = require('uglify-js');
const getFileModel = require('../util/getFileModel');
const JS_FOLDER = 'scripts';


async function useJS(path, component = "*") {
    if (getBuildStatus()) {
        const code = UglifyJS.minify(await getFileModel(path, JS_FOLDER)).code;
        if (component == "*") {
            cache.js['*'] += code;
        } else {
            cache.js[component] = code;
        }
        return;
    }
    return;
}


module.exports = useJS;