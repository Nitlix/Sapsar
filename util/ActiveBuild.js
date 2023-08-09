const { genChars } = require("./Random")

const processes = {

}


function addProcess(process, args){
    let name = genChars(10)
    while (processes[name]) {
        name = genChars(10)
    }
    processes[name] = {
        process,
        args
    }
    return name
}


function getActiveBuildProcess(processName){
    if (!processes[processName]) return false;
    return processes[processName]
}

function deleteActiveBuildProcess(processName){
    delete processes[processName]
}

async function handleAllBuildProcesses(processList, callback){
    for (let x = 0; x < processList.length; x++) {
        const process = processList[x];
        if (processes[process]) {
            const render = (await processes[process].process(processes[process].args)).toString()
            callback(render)
        }
    }

    new Promise((resolve, reject)=>{
        processList.forEach(process=>{
            deleteActiveBuildProcess(process)
        })
        resolve()
    })

    return;
}
            



module.exports = {
    addProcess,
    getActiveBuildProcess,
    deleteActiveBuildProcess,
    handleAllBuildProcesses
}