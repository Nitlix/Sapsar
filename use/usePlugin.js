const { cache } = require('../util/SapsarCompiler');

/**
 * @param {object} plugin The plugin to use.
 * @description Allows you to use custom plugins that are executed inside the RPS step of the compiler.
 */
function usePlugin(plugin){
    if (!plugin.name || typeof plugin.exec !== 'function') {
        throw new Error(`Invalid plugin import "${plugin.name}"`);
    }
    
    cache.plugins[plugin.name] = plugin.exec;
    return;
}

module.exports = usePlugin;