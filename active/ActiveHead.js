const ParseArgs = require('../basic/ParseArgs.js')

function ActiveHead(...args) {
    const { content } = ParseArgs(args)
    return `;ActiveHead;${content};/ActiveHead;`
}

module.exports = ActiveHead;