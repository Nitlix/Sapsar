const fs = require('fs')
const path = require('path')
const getDirName = require('path').dirname


function writeFileModel(filePath, contents, model="styles"){
    const actualPath = path.join(__dirname, `../../../${model}/` + filePath)

    fs.mkdir(getDirName(actualPath), { recursive: true}, function (err) {
        fs.writeFileSync(actualPath, contents);
    });
}

module.exports = writeFileModel;