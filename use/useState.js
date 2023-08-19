const { genChars } = require("../util/Random");
const ActiveScript = require("../active/ActiveScript");
const LoadJS = require("../load/LoadJS");
const { genRandomModal, cache } = require("../util/SapsarCompiler")

class StateManager {
    constructor(name, initData, ruleset, events) {
        this.data = initData;
        this.events = events || {};
        this.ruleset = ruleset || {};
        
        if (name == "!") this.name = genChars(10);
        else this.name = name;   
    }

    getData() {
        return this.data;
    }

    setData(newData) {
        this.data = newData;
    }

    setEvent(name, func) {
        this.events[name] = func;
    }

    removeEvent(name) {
        delete this.events[name];
    }


    serve(method){
        //return js code with all listenres that will be run in the frontend    

        function processArg(arg){
            return JSON.stringify(arg)
        }

        
        let events = `{`
        Object.keys(this.events).forEach(key=>{
            events += `${key}:${this.events[key].toString()},`
        })
        events += `}`

        

        let data = processArg(this.data);

        const ruleset = processArg(this.ruleset);

        const script = `CROUTER.addState({name:${processArg(this.name)},data:${data},events:${events},ruleset:${ruleset}});`

        switch (method) {
            case "LOAD":
                const name = genRandomModal("js")
                cache.js[name] = `${script}`
                return LoadJS(name);
            case "READY_LOAD":
                const name2 = useMJS(`()=>{()=>{script=${script}}; (document.readyState == "complete") ? script() : window.addEventListener("load", script);}`);
                return LoadJS(name2);
            default: 
                return this.serve("LOAD")
        }
    }



}

/**
 * @param {string} name The name of the state. (Cannot be changed, use "!" for random)
 * @param {any} initData The initial data of the state. (You can edit it at any time)
 * @param {object} ruleset The ruleset of the state. (You can change it later)
 * @param {object} events The events of the state. (You can add them later)
 */
function useState(name, initData, ruleset, events){
    return new StateManager(name, initData, ruleset, events);
}

module.exports = useState;