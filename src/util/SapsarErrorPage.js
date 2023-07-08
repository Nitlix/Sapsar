const { VERSION } = require("../formats/INFO")
const { head, title, style, body, div, h1, h4, svg, path, p, img, doctype, html } = require("../base/index")

function SapsarErrorPage(msg1, msg2, msg3, msg4){
    //remove everything from error stack after "at SapsarCompiler"
    return (
        doctype()+
        html(
            head(
                title(
                    "Sapsar Error"
                ),
                style(
                    `
                        * {
                            padding: 0;
                            margin: 0;

                        }

                        body {
                            font-family: Inter, Helvetica, Verdana, Arial;
                            display: grid;
                            min-height: 100vh;
                            place-items: center;
                            background: black;
                            color: white;
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
                            background: linear-gradient(90deg, rgba(238,146,11,1) 0%, rgba(238,0,68,1) 100%);
                        }

                        img {
                            width: 14rem;
                        }


                        .message {
                            background: #fff;
                            border-radius: 10rem;
                            width: max-content;
                            padding: 1rem 2rem;
                            color: #000;
                        }
                    `
                )
            ),
            body(
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
                            `Using Sapsar V${VERSION}`,
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
            )
        )
    )
}

module.exports = SapsarErrorPage