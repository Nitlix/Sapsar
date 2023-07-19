const {
    cache
} = require("../util/SapsarCompiler")

/**
 * @param {string} name The name of the action.
 * @param {function} func The function to run when the action is called. You should return an array of action callbacks as objects. More description in the docs.
 * @description This function is used to register a touch action to the compiler. This action can be run if the "touch" JS module is in any way imported into the page.
 */
function RegisterTouchAction(
    name = "default",
    func = (data, req) => {
        return [{
            method: "execute",
            data: `alert("This is the default Sapsar Action!")`
        }]
    })

{
    cache.touch.actions[name] = func;
}

module.exports = RegisterTouchAction;