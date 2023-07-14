const fs = require('fs');
const path = require('path');

function ScanDirectory(directoryPath) {
    let filenames = [];

    function scanDirRecursive(dir, baseDir) {
        const files = fs.readdirSync(dir);

        files.forEach((file) => {
            const filePath = path.join(dir, file);
            const relativePath = path.relative(baseDir, filePath).replace(/\\/g, '/');
            const stat = fs.statSync(filePath);

            if (stat.isFile()) {
                filenames.push(relativePath);
            } else if (stat.isDirectory()) {
                scanDirRecursive(filePath, baseDir);
            }
        });
    }

    scanDirRecursive(directoryPath, directoryPath);

    return filenames;

}

module.exports = ScanDirectory;