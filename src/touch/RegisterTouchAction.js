const {
    cache
} = require("../util/SapsarCompiler.js")


async function RegisterTouchAction(
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