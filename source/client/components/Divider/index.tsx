import * as React from "react"
import styled from "../../utils/util"

interface DividerProps {
    className?: string
    height: number
}

export class Divider extends React.Component<DividerProps> {
    static defaultProps = {
        height: 1,
    }

    render() {
        return <DividerWrapper _height={this.props.height} className={this.props.className} />
    }
}

const DividerWrapper = styled.div<{_height: number}>`
    height: ${props => `${props._height}px`};
    background: #e9e9e9;
`
