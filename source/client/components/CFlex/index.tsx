import * as React from "react"
import styled from "../../utils/util"

export type CFlexWrap = "nowrap" | "wrap" | "wrap-reverse"

export enum CFlexJustify {
    start = "flex-start",
    end = "flex-end",
    center = "center",
    between = "space-between",
    around = "space-around",
    evenly = "space-evenly",
}

export enum CFlexAlign {
    start = "flex-start",
    end = "flex-end",
    center = "center",
    baseline = "baseline",
    stretch = "stretch",
}
interface CFlexWrapperProps {
    col?: boolean
    reverse?: boolean
    jc?: CFlexJustify
    ai?: CFlexAlign
    ac?: CFlexAlign
    wrap?: CFlexWrap
}

interface CFlexItemWrapperProps {
    order?: number
    grow?: number
    shrink?: number
    basis?: string | "auto"
    aself?: CTextAlignSelf
}

const CFlexWrapper = styled.div<{item: boolean} & CFlexWrapperProps & CFlexItemWrapperProps>`
    ${props =>
        !props.item &&
        `
        display: flex;
        flex-direction: ${
            props.col ? `column${props.reverse ? "-reverse" : ""}` : `row${props.reverse ? "-reverse" : ""}`
        };
    `}

    ${props => props.jc && `justify-content: ${props.jc}`};
    ${props => props.ai && `align-items: ${props.ai}`};
    ${props => props.ac && `align-content: ${props.ac}`};
    ${props => props.wrap && `flex-wrap: ${props.wrap}`};
    ${props => props.order && `order: ${props.order}`};
    ${props => props.grow && `flex-grow: ${props.grow}`};
    ${props => props.shrink && `flex-shrink: ${props.shrink}`};
    ${props => props.basis && `flex-basis: ${props.basis}`};
    ${props => props.aself && `align-self: ${props.aself}`};
`

export type CFlexProps = {
    children?: React.ReactNode
    col: boolean
    reverse: boolean
    jc?: CFlexJustify
    ai?: CFlexAlign
    ac?: CFlexAlign
    /**
     *   "nowrap" | "wrap" | "wrap-reverse"
     **/
    wrap?: CFlexWrap
    className?: string
    style?: React.CSSProperties
    order?: number
    grow?: number
    shrink?: number
    basis?: string | "auto"
    aself?: CTextAlignSelf
    item: boolean
    as?: keyof JSX.IntrinsicElements
}

export class CFlex extends React.Component<CFlexProps> {
    static readonly jc = CFlexJustify
    static readonly ai = CFlexAlign
    static readonly ac = CFlexAlign

    static defaultProps = {
        col: false,
        reverse: false,
        item: false,
    }

    render() {
        return (
            <CFlexWrapper
                item={this.props.item}
                style={this.props.style}
                className={this.props.className}
                ac={this.props.ac}
                ai={this.props.ai}
                jc={this.props.jc}
                col={this.props.col}
                reverse={this.props.reverse}
                wrap={this.props.wrap}
                order={this.props.order}
                grow={this.props.grow}
                shrink={this.props.shrink}
                basis={this.props.basis}
                aself={this.props.aself}
                as={this.props.as}
            >
                {this.props.children}
            </CFlexWrapper>
        )
    }
}

export enum CTextAlignSelf {
    auto = "auto",
    start = "flex-start",
    end = "flex-end",
    center = "center",
    baseline = "baseline",
    stretch = "stretch",
}
