const { h1, h2, h3, p } = require("../base/index");

const app = {
    formats: {
        default: {
            "###": (e) => h3(e),
            "##": (e) => h2(e),
            "#": (e) => h1(e),
            "p": (e) => p(e)
        }
    }
}


function getFormat(name="default"){
    if (app.formats[name]) return app.formats[name];
    return false;
}

module.exports = {
    app,
    getFormat
}