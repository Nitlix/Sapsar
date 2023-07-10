const { addProcess } = require("../util/ActiveBuild.js")

function ActiveScript(func, args, build){
    addProcess(
        build, 
        func(args)
    )
}

module.exports = ActiveScript;