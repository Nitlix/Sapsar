#!/usr/bin/env node
const launchpad = require("./launchpad");


const command = process.argv[2];
let app;

switch(command){
    case "build":
        app = launchpad("build")
        break;
    case "dev":
        app = launchpad("dev", 3000)
        break;
    case "start":
        app = launchpad("start", 80)
        break;
    default:
        console.log("Invalid command. Please use 'sapsar build', 'sapsar dev', or 'sapsar start'.")
        break;
}