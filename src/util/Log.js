const Log = {
    compiler: (message) =>{
        console.log(`\x1b[36m[Sapsar Compiler]\x1b[0m ${message}`)
    },
    renderError: (error)=>{
        //red color 
        console.log(`\x1b[31m[Sapsar Render Error]\x1b[0m ${error}`)
    },
    sapsar: (message)=>{
        //gold color
        console.log(`\x1b[33m[Sapsar]\x1b[0m ${message}`)
    },
    buildError: (error)=>{
        //red color 
        console.log(`\x1b[31m[Sapsar Build Error]\x1b[0m ${error}`)
    }
}


module.exports = Log;