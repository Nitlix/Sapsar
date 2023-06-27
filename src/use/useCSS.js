const { cache } = require('../util/SapsarCompiler');


const getCSS = require('../util/getCSS');


async function useCSS(path, component="*"){
    if (component != "*"){
        cache.css[component] = await getCSS(path)
    }
    else {
        cache.css['*'] += await getCSS(path)
    }

}





module.exports = useCSS