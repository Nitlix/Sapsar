const fs = require('fs');

function checkFileModal(path) {
    if (fs.existsSync(path)) {
        return true;
    } else {
        return false;
    }
}

module.exports = checkFileModal;