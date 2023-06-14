const { cache } = require('../util/SapsarCompiler');


const getCSS = require('../util/getCSS');


async function useCSS(all=[]){
    for (let i = 0; i < all.length; i++){
        const path = all[i][0]
        let component = all[i][1]


        if (!component){
            component = "global"
        }

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
}





module.exports = useCSS