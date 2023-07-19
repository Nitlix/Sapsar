const { cache } = require("../util/SapsarCompiler")

/**
 * @param {*} page - The page which will not use Sapsar's help at all.
 * @description This function is used to disable Sapsar's functionality and make the page independent. Your page will recieve two inputs: req, and res which have the same API as Express's req and res. You may then do whatever you want with both of those objects.
 * @returns {string} The page you inputted.
 */
function useNoHelp(page){
    cache.custom.noHelp.push(page)
    return page;
}

module.exports = useNoHelp;