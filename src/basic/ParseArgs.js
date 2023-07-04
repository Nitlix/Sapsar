function ParseArgs(args) {
    let content = ""
    let props;

    for (let x in args) {
        const arg = args[x]

        if (typeof arg == "object") {
            if (Array.isArray(arg)) {
                content += arg.join("")
            }
            else {
                if (props){
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