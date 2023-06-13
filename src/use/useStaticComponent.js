const reportCSS = require('./reportCSS.js');

async function useStaticComponent(page, componentPath){
    try {
        const Component_Function =  (await import('../../../../components/' + componentPath + '.js')).default;

        const Rendered_Component = await Component_Function();

        //report used css
        reportCSS(page, [componentPath])

        return () => {
            return Rendered_Component
        }


    }
    catch (e) {
        throw new Error(`Error trying to import static component, it was not found: ${componentPath}`)
    }


    
    

}


module.exports = useStaticComponent;