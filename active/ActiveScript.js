const { addProcess } = require("../util/ActiveBuild")

function ActiveScript(func, args, build){
    addProcess(
        build, 
        func(args)
    )
}

module.exports = ActiveScript;