const { cache } = require('../util/SapsarCompiler');

/**
 * @param {object} plugin The plugin to use.
 * @param {string} pages The page to use the plugin on. (Default: "*")
 * @description Allows you to use custom plugins that are executed inside the RPS step of the compiler.
 */
function usePlugin(plugin, page="*"){
    if (!plugin.name || typeof plugin.exec !== 'function' || typeof plugin.scopes !== 'object') {
        throw new Error(`Invalid plugin import: "${plugin.name}"`);
    }
    
    cache.plugins[page].push(plugin)
    return;
}

module.exports = usePlugin;