const fs = require('fs')
const path = require('path')

async function getFileModel(filePath, model="styles") {
    return await fs.readFileSync(
        path.join(__dirname, `../../../../${model}/` + filePath)
    ).toString()
}


module.exports = getFileModel;