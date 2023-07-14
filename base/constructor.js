const { StylesResolver } = require("../util/StylesResolver");

function constructor(content="", props={}, sign="div"){
    //resolve styles
    if (props.styles) {
        if (!props.style) props.style = "";
        props.style = StylesResolver(props.style, props.styles);
        delete props.styles;
    }
    
    return `<${sign} ${Object.keys(props).map(key => `${key}="${props[key]}"`).join(" ")}>${content}</${sign}>`;
}

function miniConstructor(props, sign){
    //resolve styles
    if (props.styles) {
        if (!props.style) props.style = "";
        props.style = StylesResolver(props.style, props.styles);
        delete props.styles;
    }

    return `<${sign} ${Object.keys(props).map(key => `${key}="${props[key]}"`).join(" ")} />`;
}

module.exports = {
    constructor,
    miniConstructor
}