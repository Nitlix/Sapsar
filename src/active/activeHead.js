const ParseArgs = require('../basic/ParseArgs.js')

function ActiveHead(...args) {
    const { content, props } = ParseArgs(args)
    return `;ActiveHead;${content};/ActiveHead;`
}

module.exports = ActiveHead;