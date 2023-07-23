const getFileModel = require('../util/getFileModel');
const { getBuildStatus } = require('../util/SapsarCompiler');
const useFormat = require('./useFormat');

/**
 * @param {string} path The path to the markdown file to use as your HTML component relative to the "content" folder.
 * @param {string} preferredStore It is your provided path by default, so it doesn't have to be used. The name of the store to store the HTML in. (If you want to store it globally, use "*".)
 * @param {string} formatterType The name of the formatting component to use. (You can use this to switch between different formatting types that you provided or the default)
 * @returns {string} The name of the HTML component that was stored, so you can insert them using 
 */
async function useMarkdown(path, preferredStore=path, formatterType="default"){
    if (getBuildStatus()){
        const fileData = await getFileModel(path, "content")

        useFormat(fileData, preferredStore, formatterType)
        return preferredStore;
    }
}

module.exports = useMarkdown;