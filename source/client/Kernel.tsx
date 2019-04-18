import {configure} from "mobx"
import * as React from "react"
import * as ReactDOM from "react-dom"
import {createGlobalStyle} from "./utils/util"
import {App} from "./App"
import {ThemeProvider} from "styled-components"
import {theme} from "./theme"

const GlobalStyle = createGlobalStyle`
    html {
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
    }
    body {
        font: 14px "Roboto", sans-serif;
    }
    html, body, #root {
        margin: 0;
        padding: 0;
        height: 100%;
    }

    body {
        position: relative;
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
            <ThemeProvider theme={theme}>
                <React.Fragment>
                    <GlobalStyle />
                    <App />
                </React.Fragment>
            </ThemeProvider>,
            document.getElementById("root")
        )
    }
}
