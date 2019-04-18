import * as React from "react"
import {observer} from "mobx-react"
import styled from "../../utils/util"
import {CFlex} from "../CFlex"
import {inject} from "../../utils/inject"
import {Intl as CIntl} from "../../stores/Intl"
import {DataStore} from "../../stores/DataStore"

interface HeaderProps {
    className?: string
}

@observer
export class Header extends React.Component<HeaderProps> {
    @inject
    store: DataStore

    @inject
    intl: CIntl

    private lang(value: string) {
        return this.intl.formatMessage("Header", value)
    }

    private setLocale = (locale: string) => {
        this.intl.locale = locale
    }

    formatMoney = (number: number, currency: string) => {
        return new Intl.NumberFormat(this.intl.locale, {
            style: "currency",
            currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(number)
    }

    render() {
        const {header} = this.store

        return (
            <HeaderWrapper className={this.props.className}>
                <CFlex ai={CFlex.ai.center}>
                    {header && (
                        <React.Fragment>
                            <HeaderItem col>
                                <HeaderItemLabel>{this.lang("balance")}</HeaderItemLabel>
                                <HeaderItemValue>{this.formatMoney(header.balance, header.currency)}</HeaderItemValue>
                            </HeaderItem>
                            <HeaderItem col>
                                <HeaderItemLabel>{this.lang("pay")}</HeaderItemLabel>
                                <HeaderItemValue>
                                    {this.formatMoney(header.next_payout, header.currency)}
                                </HeaderItemValue>
                            </HeaderItem>
                        </React.Fragment>
                    )}
                </CFlex>
                <span>
                    <LangText onClick={() => this.setLocale("ru")} _active={this.intl.locale === "ru"}>
                        RU
                    </LangText>
                    <LangText onClick={() => this.setLocale("en")} _active={this.intl.locale === "en"}>
                        EN
                    </LangText>
                </span>
            </HeaderWrapper>
        )
    }
}

const LangText = styled.span<{_active: boolean}>`
    margin-left: 12px;
    ${props => (props._active ? `color: ${props.theme.primary.main};` : "cursor: pointer;")}
`

const HeaderItem = styled(CFlex)`
    &:not(:first-child) {
        margin-left: 23px;
    }
`
const HeaderItemLabel = styled.span`
    color: ${props => props.theme.grayscale.main};
    font-size: 13px;
    line-height: 19px;
`
const HeaderItemValue = styled.span`
    color: ${props => props.theme.secondary.main};
    font-size: 19px;
    line-height: 26px;
    font-family: "Rubik";
`

const HeaderWrapper = styled.header`
    padding: 18px 32px 16px;
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
