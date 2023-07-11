
const conversions = {
    alignContent: "align-content",
    alignItems: "align-items",
    alignSelf: "align-self",
    animationDelay: "animation-delay",
    animationDirection: "animation-direction",
    animationDuration: "animation-duration",
    animationFillMode: "animation-fill-mode",
    animationIterationCount: "animation-iteration-count",
    animationName: "animation-name",
    animationPlayState: "animation-play-state",
    animationTimingFunction: "animation-timing-function",
    aspectRatio: "aspect-ratio",
    
    backfaceVisibility: "backface-visibility",
    backgroundAttachment: "background-attachment",
    backgroundClip: "background-clip",
    backgroundColor: "background-color",
    backgroundImage: "background-image",
    backgroundOrigin: "background-origin",
    backgroundPosition: "background-position",
    backgroundRepeat: "background-repeat",
    backgroundSize: "background-size",
    borderBottom: "border-bottom",
    borderBottomColor: "border-bottom-color",
    borderBottomLeftRadius: "border-bottom-left-radius",
    borderBottomRightRadius: "border-bottom-right-radius",
    borderBottomStyle: "border-bottom-style",
    borderBottomWidth: "border-bottom-width",
    borderCollapse: "border-collapse",
    borderColor: "border-color",
    borderImage: "border-image",
    borderImageOutset: "border-image-outset",
    borderImageRepeat: "border-image-repeat",
    borderImageSlice: "border-image-slice",
    borderImageSource: "border-image-source",
    borderImageWidth: "border-image-width",
    borderLeft: "border-left",
    borderLeftColor: "border-left-color",
    borderLeftStyle: "border-left-style",
    borderLeftWidth: "border-left-width",
    borderRadius: "border-radius",
    borderRight: "border-right",
    borderRightColor: "border-right-color",
    borderRightStyle: "border-right-style",
    borderRightWidth: "border-right-width",
    borderSpacing: "border-spacing",
    borderStyle: "border-style",
    borderTop: "border-top",
    borderTopColor: "border-top-color",
    borderTopLeftRadius: "border-top-left-radius",
    borderTopRightRadius: "border-top-right-radius",
    borderTopStyle: "border-top-style",
    borderTopWidth: "border-top-width",
    borderWidth: "border-width",
    
    boxShadow: "box-shadow",
    boxSizing: "box-sizing",
    captionSide: "caption-side",

    columnCount: "column-count",
    columnFill: "column-fill",
    columnGap: "column-gap",
    columnRule: "column-rule",
    columnRuleColor: "column-rule-color",
    columnRuleStyle: "column-rule-style",
    columnRuleWidth: "column-rule-width",
    columnSpan: "column-span",
    columnWidth: "column-width",
    counterIncrement: "counter-increment",
    counterReset: "counter-reset",
    emtpyCells: "empty-cells",
    flexBasis: "flex-basis",
    flexDirection: "flex-direction",
    flexFlow: "flex-flow",
    flexGrow: "flex-grow",
    flexShrink: "flex-shrink",
    flexWrap: "flex-wrap",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",

    justifyContent: "justify-content",
    justifySelf: "justify-self",
    letterSpacing: "letter-spacing",
    lineHeight: "line-height",
    listStyle: "list-style",
    listStyleImage: "list-style-image",
    listStylePosition: "list-style-position",
    listStyleType: "list-style-type",

    marginBottom: "margin-bottom",
    marginLeft: "margin-left",
    marginRight: "margin-right",
    marginTop: "margin-top",
    maxHeight: "max-height",
    maxWidth: "max-width",
    minHeight: "min-height",
    minWidth: "min-width",

    outlineColor: "outline-color",
    outlineOffset: "outline-offset",
    outlineStyle: "outline-style",
    outlineWidth: "outline-width",
    overflowX: "overflow-x",
    overflowY: "overflow-y",
    
    paddingBottom: "padding-bottom",
    paddingLeft: "padding-left",
    paddingRight: "padding-right",
    paddingTop: "padding-top",

    pageBreakAfter: "page-break-after",
    pageBreakBefore: "page-break-before",
    pageBreakInside: "page-break-inside",
    
    perspectiveOrigin: "perspective-origin",

    pointerEvents: "pointer-events",
    tabSize: "tab-size",
    tableLayout: "table-layout",
    textAlign: "text-align",
    textAlignLast: "text-align-last",
    textDecoration: "text-decoration",
    textDecorationColor: "text-decoration-color",
    textDecorationLine: "text-decoration-line",
    textDecorationStyle: "text-decoration-style",
    textIndent: "text-indent",
    textJustify: "text-justify",
    textOverflow: "text-overflow",
    textShadow: "text-shadow",
    textTransform: "text-transform",
    
    transformOrigin: "transform-origin",
    transformStyle: "transform-style",
    transitionDelay: "transition-delay",
    transitionDuration: "transition-duration",
    transitionProperty: "transition-property",
    transitionTimingFunction: "transition-timing-function",

    verticalAlign: "vertical-align",
    
    whiteSpace: "white-space",

    wordBreak: "word-break",    
    wordSpacing: "word-spacing",
    wordWrap: "word-wrap",

    zIndex: "z-index"
}

function StylesResolver(style, styles) {
    let computedStyles = ""
    if (style) style += ";"
    
    for (let key in styles) {
        if (conversions[key]) {
            computedStyles += `${conversions[key]}:${styles[key]};`
        } else {
            computedStyles += `${key}:${styles[key]};`
        }
    }

    return `${style}${computedStyles}`
}

function StylesConverter(styles){
    const computed = {

    }
    for (x in styles){
        if (conversions[x]){
            computed[conversions[x]] = styles[x]
        }
        else {
            computed[x] = styles[x]
        }
    }
    return computed
}


module.exports = {
    StylesResolver,
    StylesConverter
}