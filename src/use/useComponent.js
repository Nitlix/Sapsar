const reportCSS = require('./reportCSS.js');

async function useComponent(page, componentPath){
    try {
        const Component_Function = (await import('../../../../components/' + componentPath + '.js')).default;
        
        //report used css
        reportCSS(page, [componentPath])

        return Component_Function;
    }
    catch (e) {
        throw new Error(`Error trying to import dynamic component, it was not found: ${componentPath}`)
    }
}


module.exports = useComponent;