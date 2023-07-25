const fs = require('fs')
const path = require('path')

async function writeFileModel(filePath, data, model="styles") {
    return await fs.writeFileSync(
        path.join(__dirname, `../../../${model}/` + filePath), 
        data
    )
}

module.exports = writeFileModel;