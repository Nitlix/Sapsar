const fs = require('fs');
const UglifyJS = require('uglify-js');
const path = require('path');
const Terser = require("terser");


let copyright = `// Copyright © 2023 Sapsar S.T.
// Under the managment and ownership of Nitlix S.T. All rights reserved.

`

function ScanDirectory(directoryPath) {
    let filenames = [];

    function scanDirRecursive(dir, baseDir) {
        const files = fs.readdirSync(dir);

        files.forEach((file) => {
            const filePath = path.join(dir, file);
            const relativePath = path.relative(baseDir, filePath).replace(/\\/g, '/');
            const stat = fs.statSync(filePath);

            if (stat.isFile()) {
                filenames.push(relativePath);
            } else if (stat.isDirectory()) {
                scanDirRecursive(filePath, baseDir);
            }
        });
    }

    scanDirRecursive(directoryPath, directoryPath);

    return filenames;

}


async function ProcessFile(data){
    //get anything between /** and */ and KEEP IT!
    

    const regex = /\/\*\*([\s\S]*?)\*\//g;
    let instructions = data.match(regex);
    if (!instructions) instructions = "";
    else instructions = `\n${instructions}\n`

    const code = (await Terser.minify(data, {
        mangle: false
    })).code;

    //now find the index of the space right between the first "async function" or the first "function"

    const index = code.indexOf("async function") > -1 ? code.indexOf("async function") : code.indexOf("function");

    //now insert the instructions right after the function declaration
    let finalCode = code.slice(0, index) + instructions + code.slice(index);

    //add copyright 
    finalCode = copyright + finalCode;

    return finalCode;
}


async function main(){
    const files = ScanDirectory(__dirname);


    files.forEach(async file => {
        //if file ENDS with .js
        if(file.endsWith(".js") && !file.includes("node_modules") && !file.includes("inspector.js")){
            const data = await fs.readFileSync(file, 'utf8').toString();
            const finalCode = await ProcessFile(data);
            await fs.writeFileSync(file, finalCode, 'utf8');
            console.log(`Processed ${file}`);
        }
    })

    console.log("Done!")
}

main()