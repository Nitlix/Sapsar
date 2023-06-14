const fs = require('fs')

async function getCSS(css) {
    return await fs.readFileSync(
        path.join(__dirname, '../../../../styles/' + css)
    ).toString()
}


module.exports = getCSS