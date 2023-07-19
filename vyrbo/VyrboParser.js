const esprima = require('esprima');
const estraverse = require('estraverse');

function VyrboParser(func) {
    // Convert the function to a string
    let funcString = func.toString();

    // Parse the function string into an AST
    let ast = esprima.parseScript(funcString);

    // Traverse the AST
    estraverse.traverse(ast, {
        enter: (node, parent) => {
            // If the node is a CallExpression (i.e., a function call)
            if (node.type === 'CallExpression') {
                // Convert the function call to a string
                let callString = esprima.generate(node);

                // Evaluate the function call
                let result = eval(callString);

                // Replace the function call in the function string with its output
                funcString = funcString.replace(callString, JSON.stringify(result));
            }
        }
    });

    return funcString;
}



function hi(name){
    console.log("Hi, " + name + "!");
}

console.log(VyrboParser(()=>{
    hi("Vyrbo")
}))

module.exports = VyrboParser;