import {configure} from "mobx"
import * as React from "react"
import * as ReactDOM from "react-dom"
import {createGlobalStyle} from "./utils/util"
import {App} from "./App"

const GlobalStyle = createGlobalStyle`
    html {
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
    }
    body {
        font: 14px Roboto;
    }
    html, body {
        margin: 0;
        padding: 0;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
`

configure({
    enforceActions: "observed",
})

export default class Kernel {
    public run() {
        ReactDOM.render(
            <React.Fragment>
                <GlobalStyle />
                <App />
            </React.Fragment>,
            document.getElementById("root")
        )
    }
}
