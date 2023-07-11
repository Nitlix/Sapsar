const { cache } = require('../util/SapsarCompiler');

const allowedShips = [
    "id",
    "class",
    "name",
    "modal"
]

function Ship(type="class", name="flex", modal=".flex{display:flex}"){
    if (allowedShips.includes(type)){
        if (!cache.ship[type]) cache.ship[type] = {}
        cache.ship[type][name] = modal
        return;
    }
    else {
        throw new Error(`Ship(): type "${type}" is not allowed`)
    }
}

module.exports = Ship;