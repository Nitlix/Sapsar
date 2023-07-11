const { cache } = require('../util/SapsarCompiler');

function usePlugin(plugin){
    if (!plugin.name || typeof plugin.exec !== 'function') {
        throw new Error(`Invalid plugin import "${plugin.name}"`);
    }
    
    cache.plugins[plugin.name] = plugin.exec;
    return;
}

module.exports = usePlugin;