

import fs from 'fs';

const create = [
    //all html elements that exist

    "a",
    "abbr",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "bdi",
    "bdo",
    "big",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h6",
    "head",
    "header",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "meta",
    "meter",
    "nav",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "param",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",

    "rt",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "small",
    "source",
    "span",
    "strong",
    "style",
    "sub",

    "summary",
    "sup",
    "svg",
    "table",
    "tbody",
    "td",
    "template",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",

    "title",
    "tr",
    "track",
    "u",
    "ul",
    "video",

    "wbr",
    "webview",
    "xmp"

]


let base = `import constructor from "../constructor.js";

const seperate = (args) => {
    const propsIndex = args.findIndex((input) => typeof input === "object");
    const props = propsIndex !== -1 ? args.splice(propsIndex, 1)[0] : {};

    const content = args.join(""); // Combine all remaining string inputs


    return {
        content: content,
        props: props,
    };
}


`
create.forEach((sign) => {
    base += `export function ${sign}(...args){
    const { content, props } = seperate(args);
    
    return constructor(content, props, "${sign}");
}

`
})







fs.writeFileSync("./base.js", base)