const ParseArgs = require('./ParseArgs')
const MergeProps = require('./MergeProps')
const { a, manualScript, link } = require('sapsar/base')
const { genChars } = require('../util/Random')

/**
 * Please make sure to pass "href" in props as normal.
 * @param {string} Any content to put inside. This function is like a normal-behaving sapsar element.
 * @returns {string} A specific link element that prefetches the link when it is in the viewport.
 * @description This function is like a normal-behaving <a> tag, but it prefetches the link when it is in the viewport.
 */
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