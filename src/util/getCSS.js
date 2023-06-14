const fs = require('fs')
const path = require('path')

async function getCSS(css) {
    return await fs.readFileSync(
        path.join(__dirname, '../../../../styles/' + css)
    ).toString()
}


module.exports = getCSS