const Log = require("./Log.js");
Log.vyrbo(`Booting up the Vyrbo compiler engine...`)

const webpack = require('webpack');
const fs = require('fs');



async function SapsarVyrbo(inputjs) {
    return new Promise((resolve, reject) => {
        const name = `vyrbo/${inputjs}`
        webpack({
            entry: {
                main: `./${inputjs}`
            },
            output: {
                filename: name,
                path: process.cwd() + "/temp",
            }
        }, async (err, stats) => {
            if (err || stats.hasErrors()) {
                Log.vyrbo(`Error compiling script ${inputjs}`)
                Log.vyrbo(err)
                reject(err)
            }
    
            const code = await fs.readFileSync(process.cwd() + `/temp/${name}`, 'utf8').toString();

            //delete file
            await fs.unlinkSync(process.cwd() + `/temp/${name}`)
            console.log(code)
            resolve(code)
    
            Log.vyrbo(`Compiled script ${name}`)
        });
    })
}


module.exports = SapsarVyrbo;