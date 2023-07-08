#!/usr/bin/env node
const map = require("./build");


const command = process.argv[2];
let app;

switch(command){
    case "build":
        app = map("build")
        break;
    case "dev":
        app = map("dev", 3000)
        break;
    case "start":
        app = map("start", 80)
        break;
    default:
        console.log("Invalid command. Please use 'sapsar build', 'sapsar dev', or 'sapsar start'.")
        break;
}