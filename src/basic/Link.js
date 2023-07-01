const ParseArgs = require('./ParseArgs')
const MergeProps = require('./MergeProps')
const { a, manualScript, link } = require('sapsar/base')
const { genChars } = require('../util/Random')


function Link(...args){
    const { content, props } = ParseArgs(args)

    const id = `stl_${genChars(15)}`

    if (!props.href) throw new Error("Using sapsar/basic/Link: A href is required but not present.")

    return a(
        MergeProps(
            props,
            {
                class: id
            }
        ),
        content,
        `<script data-stl>const ${id} = document.querySelector('.${id}'); new IntersectionObserver(()=>{ document.head.innerHTML += '${
            link({
                rel: "prefetch",
                href: props.href,
                as: "document",
            })}'}, {root: ${id},rootMargin: "500px",threshold: 0}).observe(${id})</script>`
    )
    
}

module.exports = Link