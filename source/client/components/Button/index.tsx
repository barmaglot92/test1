import * as React from "react"
import styled from "../../utils/util"

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    ref?: React.RefObject<HTMLButtonElement>
    as?: keyof JSX.IntrinsicElements
}

export class Button extends React.Component<ButtonProps> {
    render() {
        const {children, ...rest} = this.props
        return <ButtonWrapper {...rest}>{children}</ButtonWrapper>
    }
}
const ButtonWrapper = styled.button`
    height: 48px;
    font-size: 19px;
    background: none;
    color: #fff;
    outline: none;
    cursor: pointer;
    border: 1px solid #cfd2d9;

    &:active {
        border-style: inset;
    }
`
