const Log = require("./Log.js");
Log.vyrbo(`Booting up the Vyrbo compiler engine...`)

const webpack = require('webpack');
const fs = require('fs');


async function SapsarVyrbo(inputjs) {
    return new Promise((resolve, reject) => {
        const name = `${inputjs}`
        webpack({
            entry: {
                main: `./scripts/${inputjs}`
            },
            output: {
                filename: name,
                path: process.cwd()
            }
        }, async (err, stats) => {
            if (err || stats.hasErrors()) {
                Log.vyrbo(`Error compiling script ${inputjs}`)
                Log.vyrbo(err)
                reject(err)
            }
            const path = process.cwd() + name
            const code = await fs.readFileSync(path, 'utf8').toString();

            //delete file
            await fs.unlinkSync(path)
            resolve(code)
    
            Log.vyrbo(`Compiled script ${name}`)
        });
    })
}


module.exports = SapsarVyrbo;