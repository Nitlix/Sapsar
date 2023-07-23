const fs = require('fs')
const path = require('path')

async function getFileModel(filePath, model="styles") {
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