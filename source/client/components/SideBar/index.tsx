import * as React from "react"
import {observer} from "mobx-react"
import styled from "../../utils/util"
import LogoIcon from "../../icons/Logo"
import CircleIcon from "../../icons/Circle"
import {CFlex} from "../CFlex"

interface SideBarProps {
    className?: string
}

@observer
export class SideBar extends React.Component<SideBarProps> {
    render() {
        return (
            <SideBarWrapper col ai={CFlex.ai.center} className={this.props.className}>
                <LogoIconStyled />
                <SideBarMenu>
                    <SideBarMenuItem />
                    <SideBarMenuItem />
                    <SideBarMenuItem />
                    <SideBarMenuItem />
                    <SideBarMenuItem />
                    <SideBarMenuItem />
                    <SideBarMenuItem />
                    <SideBarMenuItem />
                </SideBarMenu>
            </SideBarWrapper>
        )
    }
}

const LogoIconStyled = styled(LogoIcon)`
    color: ${props => props.theme.primary.main};
    font-size: 40px;
`

const SideBarMenuItem = styled(CircleIcon)`
    width: 24px;
    height: 24px;
    color: ${props => props.theme.grayscale.light};
    border-width: 2px;
    cursor: pointer;

    &:not(:first-child) {
        margin-top: 48px;
    }

    &:hover {
        border-color: #fff;
    }
`

const SideBarWrapper = styled(CFlex)`
    padding: 20px 22px 20px 18px;
    background: ${props => props.theme.secondary.light};
`

const SideBarMenu = styled.nav`
    margin-top: 68px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
