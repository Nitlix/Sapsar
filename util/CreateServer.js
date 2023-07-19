const { VERSION } = require("../formats/INFO")
const express = require('express');
const cors = require('cors');


const path = require('path');


function createServer(useCors = "*") {
    const app = express();

    app.disable('x-powered-by');

    app.use(cors({
        origin: useCors
    }));

    app.use((req, res, next) => {
        res.append('x-powered-by', `Sapsar ${VERSION}`)
        next();
    });


    //use public files
    
    app.use(express.static(path.join(__dirname, '../../../public')));


    //return app

    return app;


}

module.exports = createServer;