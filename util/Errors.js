const Log = require("./Log")



const Errors = {
    noPagesFolder: ()=>{Log.buildManualError("Sapsar could not located the pages folder in root.")},
    portNotANumber: ()=>{Log.buildManualError("The port you specified is not a number between 1 and 50000.")},
    noCacheFile: ()=>{Log.buildManualError(`Sapsar could not locate the critical build cache file (at root/sapsar.js). If this code is in a deployment, expect build errors as one will be generatedo on the go.`)},
    tooManyLaunchAttempts: ()=>{Log.buildManualError(`Sapsar has attempted to launch your server 100 times on 100 different ports. This is likely due to port conflicts. Please free up used ports to let Sapsar take action.`)},
    invalidPluginScope: (scope, pluginName, page)=>{Log.renderError(`An invalid plugin scope (${scope}) being used by a plugin (${pluginName}) was detected while trying render "${page}". This error is not critical, however, it may cause unexpected behavior in terms of performance and functionality.`)},
    invalidPluginMethod: (pluginName, object, method, page)=>{Log.renderError(`An invalid plugin method "${method}" (in object type: "${object}") used by a plugin "${pluginName}" was detected while trying render page: "${page}". This error is not critical, however, it may cause unexpected behavior in terms of performance and functionality.`)},
    invalidPluginObject: (pluginName, object, page)=>{Log.renderError(`An invalid plugin object "${object}" used by a plugin "${pluginName}" was detected while trying render page: "${page}". This error is not critical, however, it may cause unexpected behavior in terms of performance and functionality.`)},
}


module.exports = Errors;