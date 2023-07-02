const { cache, getBuildStatus } = require('../util/SapsarCompiler');


const getFileModel = require('../util/getFileModel');
const JS_FOLDER = 'scripts';


async function useJS(path, component = "*") {
    if (getBuildStatus()) {
        if (component == "*") {
            cache.js['*'] += await getFileModel(path, JS_FOLDER)
        } else {
            cache.js[component] = await getFileModel(path, JS_FOLDER)
        }
        return;
    }
    return;
}


module.exports = useJS;