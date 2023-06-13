const { manualScript } = require("sapsar/base")





async function ShipTouch(port, host){
    return (
        manualScript(
            `
                const touch = async (funcName, data)=>{
                    const port = ${port}
                    
                    const touchData = await fetch("${host}:${port}/touchFunction", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            function: funcName,
                            data: data
                        })
                    })

                    console.log(touchData)
                }
                
            `
        )
    )
}

module.exports = ShipTouch;