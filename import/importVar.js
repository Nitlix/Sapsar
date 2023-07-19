const ActiveHead = require("../active/ActiveHead")
const Log = require("../util/Log")

/**
 * @description Imports a variable into your HTML using a script tag.
 * @param {string} name What the name of the variable should be.
 * @param {string|number|boolean|object} variable The variable to import.
 * @returns {string} A specific string formatted with ActiveHead to insert the variable into your head tag.
 * @example importVar("myVar", "Hello World!")
 * @example importVar("myVar", 123)
 * @example importVar("myVar", true)
*/
function importVar(name, variable){
    if (typeof variable == "object"){
        return ActiveHead(`<script ivar>let ${name} = ${JSON.stringify(variable)}</script>`)
    }
    else if (typeof variable == "string"){
        return ActiveHead(`<script ivar>let ${name} = "${variable}"</script>`)
    }
    else if (typeof variable == "number" || typeof variable == "boolean" || typeof variable == "bigint"){
        return ActiveHead(`<script ivar>let ${name} = ${variable}</script>`)
    }
    else {
        Log.renderError(`Could not import the variable ${name} into your page: ${variable.toString()}. Please make sure that the variable is a string, number, boolean, or object.`)
        return ""
    }
}

module.exports = importVar