import * as styledComponents from "styled-components"
import {ThemedStyledComponentsModule} from "styled-components"
import {theme} from "../theme"
import {flow} from "mobx"

export type Theme = typeof theme

const {
    default: styled,
    css,
    createGlobalStyle,
    keyframes,
    ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<Theme>

export {css, createGlobalStyle, keyframes, ThemeProvider}
export default styled

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export function flowed(
    _: Object,
    _1: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => IterableIterator<any>>
) {
    if (descriptor.value) {
        descriptor.value = flow(descriptor.value) as any
    }
}

export function copyToClipboard(str: string) {
    const el = document.createElement("textarea")
    el.value = str
    document.body.appendChild(el)
    el.select()
    document.execCommand("copy")
    document.body.removeChild(el)
}

export const noop = () => {
    /**/
}


