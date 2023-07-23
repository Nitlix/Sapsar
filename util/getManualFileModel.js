const fs = require('fs')
const path = require('path')

async function getManualFileModel(filePath) {
    return await fs.readFileSync(
        path.join(__dirname, `../../../` + filePath)
    ).toString()
}


module.exports = getManualFileModel;