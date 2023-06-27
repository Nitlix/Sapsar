const Combine = require("../basic/Combine")
const { head, title, style, body, div, h1, h4, p, img } = require("../base/index")
const SapsarLogo = require("./SapsarLogo")


function SapsarErrorPage(msg1, msg2, msg3, msg4){
    //remove everything from error stack after "at SapsarCompiler"

    return (
        Combine(
            head(
                title(
                    "Sapsar"
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

                        }

                        .flex {
                            display: flex;
                            flex-direction: column;
                        }

                        .errorBox {
                            padding: 2rem;
                            border-radius: 2rem;
                            border: solid 1px #cccccc;
                            gap: .5rem;
                            max-width: 50rem;
                            background: white;
                            position: relative;
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
                            background: #000;
                            border-radius: 10rem;
                            width: max-content;
                            padding: 1rem 2rem;
                            color: #fff;
                        }
                    `
                )
            ),
            body(
                div(
                    img(
                        {
                            src: "https://cdn.nitlix.pro/sapsar/logo_plain.webp"
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
                        h1(
                            `${msg2} - ${msg3}`
                        ),
                        p(
                            msg4
                        ),
                        {
                            class: "errorBox flex"
                        }
                    ),
                    {
                        class: "flex",
                        style: "gap: .5rem; align-items: center;"
                    }
                )
                
            )
        )
    )
}

module.exports = SapsarErrorPage