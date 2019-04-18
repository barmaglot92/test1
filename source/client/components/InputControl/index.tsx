import * as React from "react"
import styled from "../../utils/util"
import {CFlex} from "../CFlex"

interface InputProps extends React.HTMLProps<HTMLInputElement> {
    as?: keyof JSX.IntrinsicElements
    label?: string
    width?: number
    icon?: React.ReactNode
}

export class InputControl extends React.Component<InputProps> {
    static defaultProps = {
        width: 300,
    }

    get label() {
        return this.props.label && <InputLabel>{this.props.label}</InputLabel>
    }

    get icon() {
        return this.props.icon && <IconWrapper onClick={this.props.onClick}>{this.props.icon}</IconWrapper>
    }

    render() {
        const {ref, label, onClick, width, icon, ...rest} = this.props

        return (
            <InputControlWrapper col className={this.props.className} _width={width}>
                {this.label}
                <InputWrapper _icon={Boolean(icon)} {...rest} />
                {this.icon}
            </InputControlWrapper>
        )
    }
}

const IconWrapper = styled.span`
    font-size: 16px;
    position: absolute;
    right: 17px;
    top: 36px;
`
const InputControlWrapper = styled(CFlex)<{_width?: number}>`
    width: ${props => (props._width ? `${props._width}px` : "100%")};
    position: relative;
`
const InputWrapper = styled.input<{_icon: boolean}>`
    height: 48px;
    border: 1px solid ${props => props.theme.primary.light};
    border-radius: 4px;
    background-color: #fff;
    outline: none;
    font-size: 15px;
    padding: 15px 17px;

    ${props => props._icon && `padding-right: 40px;`}

    &:focus {
        box-shadow: 0 0 2px 0 ${props => props.theme.primary.light};
    }
`
const InputLabel = styled.label`
    color: ${props => props.theme.grayscale.main};
    font-size: 11px;
    text-transform: uppercase;
    margin-bottom: 7px;
`
