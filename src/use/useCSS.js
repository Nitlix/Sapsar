const { cache, getBuildStatus } = require('../util/SapsarCompiler');

const getFileModel = require('../util/getFileModel');
const CSS_FOLDER = 'styles'

async function useCSS(path, component="*"){
    if (getBuildStatus()) {
        if (component == "*"){
            cache.css['*'] += await getFileModel(path, CSS_FOLDER)
        }
        else {
            cache.css[component] = await getFileModel(path, CSS_FOLDER)
        }
        return;
    }
    return;
}





module.exports = useCSS