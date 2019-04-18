import * as React from "react"
import styled from "../../utils/util"
import {Button} from "../Button"
import {CFlex} from "../CFlex"

interface CardProps {
    className?: string
}

export class Card extends React.Component<CardProps> {
    render() {
        return (
            <CardWrapper {...this.props} ai={CFlex.ai.center}>
                {this.props.children}
            </CardWrapper>
        )
    }
}
const CardWrapper = styled(CFlex)`
    min-height: 120px;
    height: 120px;
    padding: 32px 26px;
    background: #ffffff;
    border: 1px solid #e2e5ec;
    border-radius: 6px;
`

export const CardTitle = styled.span`
    font-size: 29px;
    line-height: 42px;
    color: #000;
`

export const CardDesc = styled.span`
    font-size: 15px;
    line-height: 22px;
    color: ${props => props.theme.grayscale.main};
`

export const CardButton = styled(Button)`
    background: ${props => props.theme.primary.main};
`
