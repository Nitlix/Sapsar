const { queueSSG } = require("../app/app");
const { getBuildStatus } = require("../util/SapsarCompiler");


/** 
 * @param {string} page The path to the page to queue for SSG (Relative JS file)
 * @param {object} req Custom "req" parameters to be fed into your page.
 * @param {object} res Custom "res" parameters to be fed into your page.
 * @param {string} folder The folder to export the page to. (Relative to the root folder)
 * @description Queue a page for SSG. (Server-Side Generation)
 * Queues a page for manual Server-Side Generation. (SSG). The page will be exported into "dist" by default, but you can change it.
*/
function useSSG(page, req={}, res={}, folder="dist"){
    if (getBuildStatus()){
        if (typeof page !== 'string') throw new TypeError('At useSSG(): "page" must be a string.')
        if (typeof req !== 'object') throw new TypeError('At useSSG(): "req" must be an object.')
        if (typeof res !== 'object') throw new TypeError('At useSSG(): "res" must be an object.')

        queueSSG(page, req, res, folder);
        return page;
    }
    return false;
}

module.exports = useSSG;