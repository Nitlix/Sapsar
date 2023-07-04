const Log = require("./Log.js");
Log.vyrbo(`Booting up the Vyrbo compiler engine...`)

const UglifyJS = require("uglify-js");
const rollup = require('rollup');
const path = require('path');
const fs = require('fs');
const getFileModel = require("./getfileModel");



async function SapsarVyrbo(inputjs, component) {
    let bundle;
    let buildFailed = false;
    try {
        // create a bundle
        bundle = await rollup(inputOptions);

        // an array of file names this bundle depends on
        console.log(bundle.watchFiles);

        await generateOutputs(bundle);
    } catch (error) {
        buildFailed = true;
        // do some error reporting
        console.error(error);
    }
    if (bundle) {
        // closes the bundle
        await bundle.close();
    }
}

// return new Promise((resolve, reject) => {
//     const name = `vyrbo_${component}.js`
//     webpack({
//         entry: {
//             main: `./scripts/${inputjs}`
//         },
//         output: {
//             filename: name,
//             path: process.cwd() + "/temp",
//         }
//     }, async (err, stats) => {
//         if (err || stats.hasErrors()) {
//             Log.vyrbo(`Error compiling script ${inputjs}`)
//             Log.vyrbo(err)
//             return;
//         }

//         const code = await fs.readFileSync(process.cwd() + `/temp/${name}`, 'utf8').toString();
//         const result = UglifyJS.minify(code, {
//             toplevel: true,
//         });
//         console.log(result.code)

//         Log.vyrbo(`Compiled script ${name}`)
//     });
// })

module.exports = SapsarVyrbo;