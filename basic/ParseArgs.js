const MergeProps = require("./MergeProps");

/**
 * @param {any[]} Arguments to parse.
 * @returns {{content: string, props: any}} Parsed arguments to use.
 * @description This function is the backbone of Sapsar. It will make sure that all the parse arguments to a certain element/function are combined together into "content" and merged into an object called "props", which you can use in the development of your elements.
 */
function ParseArgs(args) {
    let content = ""
    let props = {}

    for (let x in args) {
        const arg = args[x]

        if (typeof arg == "object") {
            if (Array.isArray(arg)) {
                content += ParseArgs(arg).content
            }
            else {
                if (props != {}){
                    props = MergeProps(props, arg)
                }
                else {
                    props = arg
                }
            }
        }
        else {
            content += arg
        }
    }

    return {
        content: content,
        props: props,
    };
}

module.exports = ParseArgs;