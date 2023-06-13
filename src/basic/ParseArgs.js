function parseArgs(args) {
    let content = ""
    let props = {};

    for (let x in args) {
        const arg = args[x]

        if (typeof arg == "object") {
            if (Array.isArray(arg)) {
                content += arg.join("")
            }
            else {
                props = arg
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


module.exports = parseArgs;