const { app } = require("../app/app")

/**
 * @param {object} types The object containing the types of formatting you want to use. The key is the type of formatting, and the value is the function that formats the text.
 * @param {string} name The name of the formatting component to use. (You can use this to switch between different formatting types.)
 * @returns {string} The name of the formatting component that was stored, so you can then import it using ActiveCSS() or LoadCSS().
 * @description The backbone for your markdown formatting. Your formatting is imported and stored for production, and can be used in useFormat() or useMarkdown() to format a markdown text to pure HTML.
 */
function useFormatter(types={}, name="default"){
    app.formats[name] = {
        ...app.formats.default,
        ...types
    }
    return name;
}

module.exports = useFormatter;