const colors = {
    bgmagenta: '\x1b[45m',
    bgorange: '\x1b[48;5;202m',
    bgpurple: '\x1b[48;5;129m',
    bgblue: '\x1b[48;5;27m',
    bgred: '\x1b[48;5;196m',

    bold: '\x1b[1m',


    reset: '\x1b[0m',
}

const Log = {
    compiler: (message) =>{
        console.log(`${colors.bold} * ${colors.bgblue} sapsar compiler ${colors.reset} ${message}`)
    },
    renderError: (error)=>{
        //red color 
        console.log(`${colors.bold} * ${colors.bgred} sapsar render error ${colors.reset} ${error}`)
    },
    sapsar: (message)=>{
        //gold color
        console.log(`${colors.bold} * ${colors.bgpurple} sapsar ${colors.reset} ${message}`)
    },
    buildError: (error)=>{
        //red color 
        console.log(`${colors.bold} * ${colors.bgred} sapsar build error ${colors.reset} ${error}`)
    },
    router: (error)=> {
        console.log(`${colors.bold} * ${colors.bgred} sapsar router error ${colors.reset} ${error}`)
    },

    build: (message)=>{
        console.log(`${colors.bold} * \x1b[32m[Sapsar Build Manager]${colors.reset} ${message}`)
    },

    vyrbo: (message)=>{
        console.log(`${colors.bold} * ${colors.bgorange} sapsar vyrbo ${colors.reset} ${message}`)
    }
    
    
}

module.exports = Log;