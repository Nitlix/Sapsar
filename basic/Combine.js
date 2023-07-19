const ParseArgs = require("./ParseArgs")

/**
 * @description Combines all deep-level arguments into a single string using ParseArgs.
 * @param {...any} args The arguments to combine.
 */
function Combine(...args){
    const { content } = ParseArgs(args)
    
    return content;
}


module.exports = Combine;