const { genChars } = require("./Random.js")

const builds = {

}


function createUniqueBuild(){
    let id = genChars(12)

    while (builds[id]){
        id = genChars(12)
    }

    builds[id] = {
        processes: []
    }

    return id
}


function removeBuild(build){
    delete builds[build]
}


function addProcess(build, process, args){
    builds[build].processes.push({
        process,
        args
    })
}

function getBuild(id){
    return builds[id]
}

function getBuildProcesses(build){
    return builds[build].processes
}

module.exports = {
    createUniqueBuild,
    removeBuild,
    addProcess,
    getBuild,
    getBuildProcesses
}