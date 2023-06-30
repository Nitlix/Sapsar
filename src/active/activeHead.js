const ParseArgs = require('../basic/ParseArgs.js')

function ActiveHead(...args) {
    const { content, props } = ParseArgs(args)
    return `;activeHead;${content};/activeHead;`
}

module.exports = ActiveHead;