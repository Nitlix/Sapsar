

const { constructor, miniConstructor } = require("./constructor")

const ParseArgs = require ("sapsar/basic/ParseArgs")

function doctype(){
    return "<!DOCTYPE html>";
}


function a(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "a");
}

function abbr(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "abbr");
}

function address(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "address");
}

function area(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "area");
}

function article(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "article");
}

function aside(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "aside");
}

function audio(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "audio");
}

function b(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "b");
}

function base(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "base");
}

function bdi(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "bdi");
}

function bdo(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "bdo");
}

function big(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "big");
}

function blockquote(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "blockquote");
}

function body(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "body");
}

function br(...args){
    const { content, props } = ParseArgs(args);
    
    return miniConstructor(props, "br");
}

function button(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "button");
}

function canvas(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "canvas");
}

function caption(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "caption");
}

function cite(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "cite");
}

function code(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "code");
}

function col(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "col");
}

function colgroup(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "colgroup");
}

function data(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "data");
}

function datalist(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "datalist");
}

function dd(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "dd");
}

function del(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "del");
}

function details(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "details");
}

function dfn(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "dfn");
}

function dialog(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "dialog");
}

function div(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "div");
}

function dl(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "dl");
}

function dt(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "dt");
}

function em(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "em");
}

function embed(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "embed");
}

function fieldset(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "fieldset");
}

function figcaption(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "figcaption");
}

function figure(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "figure");
}

function footer(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "footer");
}

function form(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "form");
}

function h1(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "h1");
}

function h2(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "h2");
}

function h3(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "h3");
}

function h4(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "h4");
}

function h5(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "h5");
}

function h6(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "h6");
}

function head(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "head");
}

function header(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "header");
}

function hr(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "hr");
}

function html(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "html");
}

function i(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "i");
}

function iframe(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "iframe");
}

function img(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "img");
}

function input(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "input");
}

function ins(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "ins");
}

function kbd(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "kbd");
}

function label(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "label");
}

function legend(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "legend");
}

function li(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "li");
}

function link(...args){
    const { content, props } = ParseArgs(args);
    
    return miniConstructor(props, "link");
}

function main(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "main");
}

function map(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "map");
}

function mark(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "mark");
}

function meta(...args){
    const { content, props } = ParseArgs(args);
    
    return miniConstructor(props, "meta");
}

function meter(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "meter");
}

function nav(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "nav");
}

function noscript(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "noscript");
}

function object(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "object");
}

function ol(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "ol");
}

function optgroup(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "optgroup");
}

function option(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "option");
}

function output(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "output");
}

function p(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "p");
}

function param(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "param");
}

function picture(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "picture");
}

function pre(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "pre");
}

function progress(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "progress");
}

function q(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "q");
}

function rp(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "rp");
}

function rt(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "rt");
}

function ruby(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "ruby");
}

function s(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "s");
}

function samp(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "samp");
}

function script(...args){
    const { content, props } = ParseArgs(args);

    const callbackString = content.toString();
    const functionBody = callbackString.match(/(?<=\{)([^}]*)/)[0].trim();
    
    return constructor(functionBody, props, "script");
}

function manualScript(...args){
    const { content, props } = ParseArgs(args);

    return constructor(content, props, "script");
}


function section(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "section");
}

function select(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "select");
}

function slot(...args){
    const { content, props } = ParseArgs(args);

    return constructor(content, props, "slot");
}

function small(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "small");
}

function source(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "source");
}

function span(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "span");
}

function strong(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "strong");
}

function style(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "style");
}

function sub(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "sub");
}

function summary(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "summary");
}

function sup(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "sup");
}

function svg(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "svg");
}

//svg components

function circle(...args){
    const { content, props } = ParseArgs(args);

    return constructor(content, props, "circle");
}

function clipPath(...args){
    const { content, props } = ParseArgs(args);

    return constructor(content, props, "clipPath");
}

function defs(...args){
    const { content, props } = ParseArgs(args);

    return constructor(content, props, "defs");
}

function ellipse(...args){
    const { content, props } = ParseArgs(args);

    return constructor(content, props, "ellipse");
}

function foreignObject(...args){
    const { content, props } = ParseArgs(args);

    return constructor(content, props, "foreignObject");
}

function g(...args){
    const { content, props } = ParseArgs(args);

    return constructor(content, props, "g");
}

function image(...args){
    const { content, props } = ParseArgs(args);

    return constructor(content, props, "image");
}

function line(...args){
    const { content, props } = ParseArgs(args);

    return constructor(content, props, "line");
}

function path(...args){
    const { content, props } = ParseArgs(args);

    return constructor(content, props, "path");
}

//continue

function table(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "table");
}

function tbody(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "tbody");
}

function td(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "td");
}

function template(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "template");
}

function textarea(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "textarea");
}

function tfoot(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "tfoot");
}

function th(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "th");
}

function thead(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "thead");
}

function time(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "time");
}

function title(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "title");
}

function tr(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "tr");
}

function track(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "track");
}

function u(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "u");
}

function ul(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "ul");
}

function video(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "video");
}

function wbr(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "wbr");
}

function webview(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "webview");
}

function xmp(...args){
    const { content, props } = ParseArgs(args);
    
    return constructor(content, props, "xmp");
}



module.exports = {
    doctype,
    a,
    abbr,
    address,
    area,
    article,
    aside,
    audio,
    b,
    base,
    bdi,
    bdo,
    blockquote,
    body,
    br,
    button,
    canvas,
    caption,
    cite,
    code,
    col,
    colgroup,
    data,
    datalist,
    dd,
    del,
    details,
    dfn,
    dialog,
    div,
    dl,
    dt,
    em,
    embed,
    fieldset,
    figcaption,
    figure,
    footer,
    form,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    head,
    header,
    hr,
    html,
    i,
    iframe,
    img,
    input,
    ins,
    kbd,
    label,
    legend,
    li,
    link,
    main,
    map,
    mark,
    meta,
    meter,
    nav,
    noscript,
    object,
    ol,
    optgroup,
    option,
    output,
    p,
    param,
    picture,
    pre,
    progress,
    q,
    rp,
    rt,
    ruby,
    s,
    samp,
    script,
    manualScript,
    section,
    select,
    slot,
    small,
    source,
    span,
    strong,
    style,
    sub,
    summary,
    sup,

    svg,
    circle,
    clipPath,
    defs,
    ellipse,
    foreignObject,
    g,

    image,
    line,
    path,
    table,
    tbody,
    td,
    template,
    textarea,
    tfoot,
    th,
    thead,
    time,
    title,
    tr,
    track,
    u,
    ul,
    video,
    wbr,
    webview,
    xmp
}