 CROUTER = (()=>{

    CROUTER = {
        meta: "SAPSAR-1",
        
        cache: {
            pages: {

            }
        },

        states: {

        },

        events: {
            ON_PAGELOAD: [],

            ON_PRE_SWITCH: [],
            ON_POST_SWITCH: [],
            ON_FAIL_SWITCH: [],
            ON_ALT_SWITCH: [],

            ON_PRE_FETCH: [],
            ON_POST_FETCH: [],
            ON_FAIL_FETCH: [],

            ON_SESSION_END: [],

            ON_BACK: [],
            ON_FORWARD: [],
        },

        URLParser: (url)=>{
            return new URL(url, window.location.href).href
        },

        JSONFS_To_O: (jsonfs) => {
            return JSON.parse(jsonfs, (key, value) => {
                try {
                    return eval(value)
                }
                catch (e) {
                    return value
                }
            })
        },

        O_To_JSONFS: (o) => {
            return JSON.stringify(o, (key, value) => {
                try {
                    return value.toString()
                }
                catch (e) {
                    return value
                }
            })
        },

        updateHead: (newHeadHTML) => {
            const head = document.head;
            const savedStylesheets = [];
            const savedScripts = [];
            
            // Regular expression to match stylesheet and script tags
            const stylesheetRegex = new RegExp('<link[^>]+rel="stylesheet"[^>]+>', 'g');
            const scriptRegex = new RegExp('<script[^>]+src="([^"]+)"[^>]*><\/script>', 'g');

            
            // Remove stylesheets from the new head HTML and save them to the array
            newHeadHTML = newHeadHTML.replace(stylesheetRegex, (match) => {
                savedStylesheets.push(match);
                return '';
            });
            
            // Remove scripts from the new head HTML and save them to the array
            newHeadHTML = newHeadHTML.replace(scriptRegex, (match, src) => {
                // Exclude the specific script mentioned in the caution
                if (src !== '/_sapsar/crouter.js') {
                savedScripts.push(match);
                return '';
                }
                return match;
            });

            
            // Replace the current head with the new head HTML
            head.innerHTML = newHeadHTML;
            
            // Append saved stylesheets to the head
            savedStylesheets.forEach((stylesheet) => {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = stylesheet.match(/href="([^"]+)"/)[1];
                head.appendChild(link);
                });
                
                // Append saved scripts to the head
                savedScripts.forEach((script) => {
                const newScript = document.createElement('script');
                newScript.src = script.match(/src="([^"]+)"/)[1];
                head.appendChild(newScript);
                });
        },


        extractContent: (data) => {
            const bodyRegex = new RegExp('<body>([\\s\\S]*?)<\\/body>', 'g');
            const headRegex = new RegExp('<head>([\\s\\S]*?)<\\/head>', 'g');

            // Check if there is a match for sapsarBodyRegex
            // If there is, then set sapsar to the insides of the div, else set it to null

            let body = data.match(bodyRegex)[0]
            let sapsar = false;


            if (body.includes('<div id="__sapsar">')){
                //__sapsar exists so
                //remove <body> and </body>
                //remove <div id="__sapsar"> 
                //strip away the last </div>
                try {
                    sapsar = body.replace('<body>', '')
                    sapsar = sapsar.replace('</body>', '')
                    sapsar = sapsar.replace('<div id="__sapsar">', '')
                    
                    //get index of last div
                    const lastDivIndex = sapsar.lastIndexOf('</div>')
                    //remove everything after last div
                    sapsar = sapsar.substring(0, lastDivIndex)
                }
                catch(e){
                    sapsar = false;
                }
            }


            const head = data.match(headRegex)[0]

            return {
                body: body,
                head: head,
                sapsar: sapsar
            }
        }, 

        fetchPage: async (url) => {
            // check if url is local
            // if not, return
            
            CROUTER.events.ON_PRE_FETCH.forEach((event) => {
                event();
            });
            
            const local = (() => {
                const current = new URL(window.location.href);
                const target = new URL(url, window.location.href);
                if (current.origin == target.origin) {
                    return true;
                }
                return false;
            })();
            
            if (!local) {
                return;
            }
            
            url = CROUTER.URLParser(url);
            const res = await fetch(url);
            const data = await res.text();
            const extraction = CROUTER.extractContent(data);
            
            CROUTER.cache.pages[url] = {
                type: "page",
                ...extraction,
            };
        },

        switchPage: async (url, addStates=true, scrollTo=null) => {


            CROUTER.events.ON_PRE_SWITCH.forEach((event)=>{
                event()
            })


            url = CROUTER.URLParser(url)

            if (CROUTER.cache.pages[url]) {
                //change location url without reloading
                //push current state

                if (addStates) {
                    history.replaceState({
                        url: window.location.href
                    }, "", window.location.href)
                }

                else {
                    //going back to a page
                    //check if the head contains: property="sapsar:ruleset:no-cache"
                    if (CROUTER.cache.pages[url].head.includes('property="sapsar:ruleset:no-cache"')){
                        //refetch page
                        await CROUTER.fetchPage(url)
                    }
                }


                
                if (CROUTER.cache.pages[url].sapsar){
                    document.getElementById("__sapsar").innerHTML = CROUTER.cache.pages[url].sapsar;
                }
                else {
                    document.body.innerHTML = CROUTER.cache.pages[url].body;
                }

                CROUTER.updateHead(CROUTER.cache.pages[url].head)

                //push next state but parse the url to be the new url

                if (addStates){
                    history.pushState({
                        url: url
                    }, "", url)
                }
                

                //scroll to top with no transition
                if (!scrollTo) {
                    window.scroll({
                        top: 0,
                        left: 0,
                        behavior: 'instant'
                    })
                }
                else {
                    document.querySelector(scrollTo).scrollIntoView()
                }

                CROUTER.events.ON_POST_SWITCH.forEach((event)=>{
                    event()
                })

                CROUTER.ONPAGELOAD()

                return true;
            }
            else {
                await CROUTER.fetchPage(url)

                if (CROUTER.cache.pages[url]) {
                    CROUTER.switchPage(url, true)
                    return;
                }
                else {
                    // Deactivate CROUTER.
                    // Because the page cannot be accessed via fetch, it is probably a different domain.
                    // So, we will just redirect the user to the page.

                    CROUTER.events.ON_ALT_SWITCH.forEach((event)=>{
                        event()
                    })
                    
                    window.location.href = url;
                }
            }
        },

        back: () => {
            history.back()
        },

        forward: () => {
            history.forward()
        },

        addState: (state) => {
            if (!state.name || !state.events || !state.ruleset || !state.data){
                console.error("SAPSAR CROUTER: Invalid state: ", state)
                return;
            }

        
            
            const rule = state.ruleset.adding || "permit"
            switch (rule){
                case "replace":
                    CROUTER.states[state.name] = state
                    break;
                case "permit":
                    try {
                        CROUTER.states[state.name].events;
                        return;
                    }
                    catch(e){
                        CROUTER.states[state.name] = state
                    }
                    break;
                case "deny":
                    if (CROUTER.states[state.name]) {
                        delete CROUTER.states[state.name]
                    }
                    break;
            }


            //handle events

            Object.keys(state.events).forEach((eventName)=>{
                const event = state.events[eventName]

                switch(eventName){
                    case "ON_ADD":
                        event()
                        break;
                    case "ON_UPDATE":
                        let oldValue = structuredClone(state.data)
                        setInterval(()=>{
                            if (JSON.stringify(oldValue) != JSON.stringify(state.data)){
                                state.events.onUpdate()
                                oldValue = structuredClone(state.data)
                            }
                        }, 50)
                        break;
                    
                    case "UPDATE":
                        if (state.ruleset.updatePeriod > 0){
                            setInterval(()=>{
                                state.events.update()
                            }, state.ruleset.updatePeriod)
                        }
                        break;
                    
                    default: 
                        if (CROUTER.events[eventName]){
                            CROUTER.events[eventName].push(event)
                        }
                }
            })



        },




        // ===========
        // EVENTS
        // ===========

        ONPAGELOAD: ()=>{
            //create cache for the current page
            if (!CROUTER.cache.pages[window.location.href]){
                const html = document.documentElement.outerHTML.toString()
                CROUTER.cache.pages[window.location.href] = CROUTER.extractContent(html)
            }

            document.querySelectorAll("a").forEach(async (a) => {
                //check if a.href is pointing to an id (includes #)

                
                //check if there is a href
                if (!a.href){
                    return;
                }

                const urlObj = new URL(a.href, window.location.href)
                const currentURL = new URL(window.location.href)

                if (urlObj.pathname == currentURL.pathname){
                    return;
                }

                if (a.getAttribute("no-router") == "true"){
                    return;
                }

                if (a.getAttribute("prefetch") == "true"){
                    await CROUTER.fetchPage(a.getAttribute("href"))
                }
                
                    
                let scrollTo = null;
                if (a.getAttribute("href").includes("#")) {
                    scrollTo = a.getAttribute("href").split("#")[1].split("?")[0]
                }
            
                a.addEventListener("click", (e) => {
                    e.preventDefault()                        
                    CROUTER.switchPage(a.getAttribute("href"), true, scrollTo)
                    return false;
                })
            }),

            CROUTER.events.ON_PAGELOAD.forEach((event)=>{
                event()
            })
        }
    }
    

    
    const sStorageData = sessionStorage.getItem("CROUTER")
    // exists and meta is the same
    if (sStorageData) {
        const newCache = JSON.parse(sStorageData)

        if (newCache.meta == CROUTER.meta) {
            CROUTER.cache = newCache
        }

        Object.keys(CROUTER.states).forEach((stateName)=>{
            delete CROUTER.states[stateName]
        })
    }


    //add an event where the user switches pages
    window.addEventListener("popstate", (e) => {
        if (e.state) {
            CROUTER.switchPage(e.state.url, false)
        }
    })
    
    if (document.readyState === "complete") {
        CROUTER.ONPAGELOAD()
    }
    else {
        document.addEventListener("DOMContentLoaded", () => {
            //create cache for the current page
            CROUTER.ONPAGELOAD()
        })
    }

    

    //save cache to session storage
    window.addEventListener("beforeunload", () => {
        new Promise((resolve, reject)=>{
            CROUTER.events.ON_SESSION_END.forEach((event)=>{
                event()
            })
            resolve()
        })

        sessionStorage.setItem(
            "CROUTER", 
            JSON.stringify(CROUTER.cache)
        )
    })

    return CROUTER;
})()   
