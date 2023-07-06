const colors = require('./ConsoleColors')


const stack = (error) => {
    return `\n * [${colors.bgred} ${colors.reset}] ${colors.bold} Stack -- ${error.stack}\n`
}


const Log = {
    compiler: (message) =>{
        console.log(`${colors.bold} * ${colors.bgblue} sapsar compiler ${colors.reset} ${message}`)
    },
    renderError: (page, error)=>{
        //red color 
        console.log(`\n${colors.bold} * ${colors.bgred} sapsar render error ${colors.reset} Something went wrong rendering ${colors.bold}${page}. ${stack(error)}`)
    },
    sapsar: (message)=>{
        //gold color
        console.log(`${colors.bold} * ${colors.bgpurple} sapsar ${colors.reset} ${message}`)
    },
    buildError: (error)=>{
        //red color 
        console.log(`\n${colors.bold} * ${colors.bgred} sapsar build error ${colors.reset} ${error}`)
    },
    router: (error)=> {
        console.log(`${colors.bold} * ${colors.bgred} sapsar router error ${colors.reset} ${error}`)
    },

    build: (message)=>{
        console.log(`${colors.bold} * \x1b[32m[Sapsar Build Manager]${colors.reset} ${message}`)
    },

    vyrbo: (message)=>{
        console.log(`${colors.bold} * ${colors.bgorange} sapsar vyrbo ${colors.reset} ${message}`)
    },

    serve: (port)=>{
        Log.sapsar(`Ready to serve on ${colors.bgpurple}${colors.bold}[http://localhost:${port}]${colors.reset}! Any debugging or errors will be logged below.`)
    },


    savePageFunctionError: (page, error)=>{
        Log.buildError(`An error occured while trying to cache page function: ${colors.bold}${page} ${stack(error)}`)
    }
    
    
}

module.exports = Log;