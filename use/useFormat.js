const {
    getFormat
} = require("../app/app");
const { getBuildStatus } = require("../util/SapsarCompiler");

/**
 * @param {string} string The string to format.
 * @param {string} formatterType The name of the formatting component to use. (You can use this to switch between different formatting types that you provided or the default)
 * @returns {string} The formatted string.
 * @description In here, your custom markdown will be converted to pure HTML according to the set formatter type rules.
 */
function useFormat(string, preferredStore, formatterType = "default") {
    if (getBuildStatus()){
        let format = getFormat(formatterType);
        if (!format) format = getFormat("default");

        const lines = string.split("\n");

        for (let i = 0; i < lines.length; i++) {
            for (let converter in format) {
                if (lines[i].startsWith(converter)) {
                    let content = lines[i].substring(converter.length);
                    content = content.trim(); // Remove leading and trailing spaces
                    lines[i] = format[converter](content);
                    break;
                }
            }
        }

        const code = lines.join("");
        if (preferredStore === '*') {
            cache.html['*'] += code
        }
        else {
            cache.html[preferredStore] = code
        }
        
        return preferredStore;

    }

}

module.exports = useFormat;