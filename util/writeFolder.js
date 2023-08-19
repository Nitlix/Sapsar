const fs = require('fs');
const path = require('path')

function writeFolder(folder){
    fs.mkdirSync(path.join(__dirname, `../../../${folder}`));
}

module.exports = writeFolder;