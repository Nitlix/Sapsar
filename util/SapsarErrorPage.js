const { VERSION } = require("../formats/INFO.js")
const { title, div, h1, h4, svg, path, p, img, style, } = require("../base/index")
const ActiveHead = require("../active/ActiveHead")




function SapsarErrorPage(msg1, msg2, msg3, msg4){
    return [
        ActiveHead(
            title("Sapsar Error"),
        ),

        style(`
            :root {
                --gradient: linear-gradient(90deg, rgb(69,66,255) 0%, rgb(56,101,251) 8%, rgb(55,104,251) 11%, rgb(10,212,158) 38%, rgb(174,91,249) 56%, rgb(141, 90,249) 69%, rgb(255,0,255) 88%, rgb(255,255, 0) 100%);
            }
        
            * {
                padding: 0;
                margin: 0;
        
            }
        
            #__sapsar {
                font-family: Inter, Helvetica, Verdana, Arial;
                display: grid;
                min-height: 100vh;
                place-items: center;
                background: black;
                color: white;
        
                position: relative;
                z-index: 0;
            }
        
            .flex {
                display: flex;
                flex-direction: row;
            }
        
            .flex.v {
                flex-direction: column;
            }
        
            .errorBox {
                padding: 2rem;
                border-radius: 2rem;
                border: solid 1px #4a4a4a;
                gap: .5rem;
                max-width: 50rem;
                background: #000;
                position: relative;
                padding-bottom: 5rem;
            }

            .errorBox p {
                color: #9B9B9B;
            }

            .errorBox::after {
                content: "";
                position: absolute;
                z-index: -1;
                top: -.25rem;
                left: 0;
                right: 0;
                bottom: -.25rem;
                border-radius: 2rem;
                background: var(--gradient);
            }
        
            img {
                width: 14rem;
            }
        
            .message {
                background: #fff;
                border-radius: 10rem;
                width: max-content;
                padding: .75rem 2rem;
                color: #000;
            }
        `),

        div(
            img(
                {
                    src: "https://cdn.nitlix.pro/sapsar/logo_plain_dark.webp"
                }
            ),
            div(
                div(
                    h4(
                        msg1
                    ),
                    {
                        class: "message"
                    }
                ),
                
                div(
                    svg(
                        {
                            xmlns:"http://www.w3.org/2000/svg",
                            width: "24",
                            height: "24", 
                            viewBox:"0 0 24 24"
                        },
                        path(
                            {
                                fill: "#c92c20",
                                d: "M13 14h-2V9h2m0 9h-2v-2h2M1 21h22L12 2L1 21Z"
                            }
                        )
                    ),
                        
                    h1(
                    `${msg2} - ${msg3}`
                    ),
                    {
                        class: "flex",
                        styles: {
                            justifyContent: "center",
                            alignItems: "center",
                            width: "max-content",
                            gap: ".5rem"
                        }
                    }
                ),
                
                p(
                    msg4
                ),
                p(
                    "MaxJ my beloved",
                    {
                        style: 'display: none;'
                    }
                ),
                p(
                    `Using Sapsar ${VERSION}`,
                    {
                        styles: {
                            position: "absolute",
                            bottom: "2rem",
                            left: "2rem"
                        }
                    }
                    
                ),
                {
                    class: "errorBox flex v"
                }
            ),
            {
                class: "flex v",
                style: "gap: .5rem; align-items: center;"
            }
        )
    ]
}

module.exports = SapsarErrorPage