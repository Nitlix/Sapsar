const ActiveHead = require("../active/ActiveHead")
const Log = require("../util/Log")

/**
 * @description Imports a variable into your MJS.
 * @param {string} name What the name of the variable should be.
 * @param {string|number|boolean|object} variable The variable to import.
 * @returns {string} A specific string formatted with ActiveHead to insert the variable into your head tag.
 * @example importMVar("myVar", "Hello World!")
 * @example importMVar("myVar", 123)
 * @example importMVar("myVar", true)
*/
function importMVar(name, variable){
    if (typeof variable == "object"){
        return ActiveHead(`let ${name} = ${JSON.stringify(variable)}`)
    }
    else if (typeof variable == "string"){
        return ActiveHead(`let ${name} = "${variable}"`)
    }
    else if (typeof variable == "number" || typeof variable == "boolean" || typeof variable == "bigint"){
        return ActiveHead(`let ${name} = ${variable}`)
    }
    else {
        Log.renderError(`Could not import the variable ${name} into your MJS script: ${variable.toString()}. Please make sure that the variable is a string, number, boolean, or object.`)
        return ""
    }
}

module.exports = importMVar;