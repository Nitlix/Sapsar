const fs = require('fs')
const path = require('path')


const networkCache = {

}

async function getFileModel(filePath, model="styles") {
    if (filePath.startsWith("http://") || filePath.startsWith("https://")){
        //Check in network cache
        if (networkCache[filePath] && !filePath.includes("sapsar:no-cache")){
            return networkCache[filePath]
        }

        const res = await fetch(filePath)
        if (!res.ok){
            throw new Error(`At getFileModel() Call, the file "${filePath}" was not found.`)
        }
        const data = await res.text()
        networkCache[filePath] = data
        return data
    }

    try {
        return await fs.readFileSync(
            path.join(__dirname, `../../../${model}/` + filePath)
        ).toString()
    }
    catch(err){
        throw new Error(`At getFileModel() Call, the file "${filePath}" was not found.`)
    }
}


module.exports = getFileModel;