import * as React from "react"
import {keyframes} from "styled-components"
import styled from "../../utils/util"

const clip = keyframes`
  0% {transform: rotate(0deg) scale(1)}
  50% {transform: rotate(180deg) scale(0.8)}
  100% {transform: rotate(360deg) scale(1)}
`

interface LoaderPropsUnitProps {
    size: number
    color: string
    thickness: number
}

export const CCircleLoaderUnit = styled.div<LoaderPropsUnitProps>`
    background: transparent;
    width: ${props => `${props.size}px`};
    height: ${props => `${props.size}px`};
    border-radius: 100%;
    border: ${props => `${props.thickness}px`} solid;
    border-color: ${props => props.color};
    border-bottom-color: transparent;
    display: inline-block;
    animation: ${clip} 0.75s 0s infinite linear;
    animation-fill-mode: both;
`

export interface LoaderProps {
    size: number
    color: string
    loading: boolean
    thickness: number
    style?: React.CSSProperties
}

export class Loader extends React.Component<LoaderProps> {
    static defaultProps = {
        loading: true,
        size: 20,
        thickness: 2,
    }

    getUnit = () => {
        const {size, color, thickness, style} = this.props
        return <CCircleLoaderUnit style={style} thickness={thickness} size={size} color={color} />
    }

    render() {
        return this.props.loading && this.getUnit()
    }
}
