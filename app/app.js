const {SapsarCompiler} = require("../util/SapsarCompiler");
const { h1, h2, h3, p } = require("../base/index");
const writeFileModel = require("../util/writeFileModel");
const checkFileModal = require("../util/checkFileModal");
const writeFolder = require("../util/writeFolder");
const Log = require("../util/Log");

const app = {
    formats: {
        default: {
            "###": (e) => h3(e),
            "##": (e) => h2(e),
            "#": (e) => h1(e),
            "p": (e) => p(e)
        }
    },
    ssg: {
        queue: [],
        ssgData: {

        }
    }
}




class VirtualReq {
    constructor(url){
        this.headers = {};
        this.body = {};
        this.params = {};
        this.query = {};
        this.url = url;
        this.method = "GET";
        this.fullPath = url;
        this.path = url;
        this.cookies = {};
    }
}

class VirtualRes {
    constructor(url, res){
        this.headers = {};
        this.body = {};
        this.params = {};
        this.query = {};
        this.statusCode = 200;

        this.ssgSavior = url;

        Object.keys(res).forEach((key) => {
            this[key] = res[key];
        });

        app.ssg.ssgData[this.ssgSavior] = {
            html: "",
            resources: [

            ]
        }
    }

    write(data){
        app.ssg.ssgData[this.ssgSavior].html += data;
    }

    setSSGResource(path, data){
        app.ssg.ssgData[this.ssgSavior].resources.push({
            path,
            data
        })
    }

    end(data){
        app.ssg.ssgData[this.ssgSavior].html += data;;
    }

    send(data){
        app.ssg.ssgData[this.ssgSavior].html += data;;
    }

    json(data){
        app.ssg.ssgData[this.ssgSavior].html += JSON.stringify(data);
    }

    status(code){
        this.statusCode = code;
    }

    setHeader(key, value){
        return this.headers[key] = value;
    }

    getHeader(key){
        return this.headers[key];
    }

    getHeaders(){   
        return this.headers;
    }

    cookie(){
        return false;
    }
}





function getFormat(name="default"){
    if (app.formats[name]) return app.formats[name];
    return false;
}



// SERVER-SIDE GENERATION (SSG)

function queueSSG(page, req, res, folder){
    app.ssg.queue.push({
        page,
        req,
        res,
        folder
    })
}

async function handleAllSSG(){
    await app.ssg.queue.forEach(async (page) => {

        const req = new VirtualReq(page.page, page.req)
        const res = new VirtualRes(page.page, page.res)

        await SapsarCompiler(page.page, req, res, false, true);

        if (!checkFileModal(page.folder)){
            writeFolder(page.folder);
        }
        
        await writeFileModel(res.ssgSavior + ".html", app.ssg.ssgData[res.ssgSavior].html, page.folder);
        for (let i = 0; i < app.ssg.ssgData[res.ssgSavior].resources.length; i++){
            await writeFileModel(app.ssg.ssgData[res.ssgSavior].resources[i].path, app.ssg.ssgData[res.ssgSavior].resources[i].data, page.folder);
        }

        Log.ssg(`Exported ${res.ssgSavior}.html with its resources into ${page.folder} successfully!`)
    })

}

module.exports = {
    app,
    getFormat,
    queueSSG,
    handleAllSSG
}