const { cache } = require('../util/SapsarCompiler');


const getCSS = require('../util/getCSS');


async function useCSS(path, component="global"){
    if (component != "global"){
        if (cache.css[component] == undefined){
            cache.css[component] = []
        }
        else {
            return
        }

        cache.css[component] = await getCSS(path)

    }

    else {
        cache.css.global += await getCSS(path)
    }

}





module.exports = useCSS