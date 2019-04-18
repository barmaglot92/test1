import {observer} from "mobx-react"
import * as React from "react"
import {Button} from "../../components/Button"
import {Card, CardDesc, CardTitle} from "../../components/Card"
import {CFlex} from "../../components/CFlex"
import {InputControl} from "../../components/InputControl"
import CopyIcon from "../../icons/Copy"
import styled, {copyToClipboard} from "../../utils/util"
import {DataStore} from "../../stores/DataStore"
import {inject} from "../../utils/inject"
import {Divider} from "../../components/Divider"
import {Intl} from "../../stores/Intl"
import {observable, action, computed} from "mobx"

interface MainPageProps {
    className?: string
}

@observer
export class MainPage extends React.Component<MainPageProps> {
    @inject
    store: DataStore

    @inject
    intl: Intl

    @observable
    filterValue = ""

    @action
    handleFilterChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.filterValue = event.currentTarget.value
    }

    @action
    handleFilterClear = () => {
        this.filterValue = ""
    }

    private lang(value: string) {
        return this.intl.formatMessage("MainPage", value)
    }

    handleClick = (promocode: string) => {
        copyToClipboard(promocode)
    }

    @computed
    get bonuses() {
        return this.store.bonuses.filter(b => b.title.toLowerCase().startsWith(this.filterValue.toLowerCase()))
    }

    render() {
        const {error} = this.store
        return (
            <MainPageWrapper className={this.props.className}>
                <PageContent col grow={1}>
                    {error ? (
                        <ErrorStyled>{error}</ErrorStyled>
                    ) : (
                        <CFlex grow={1} col>
                            <CFlex col>
                                <StyledTitle>{this.lang("service")}</StyledTitle>
                                <FilterContainer>
                                    <InputControl
                                        onChange={this.handleFilterChange}
                                        value={this.filterValue}
                                        label={this.lang("filter")}
                                        width={300}
                                    />
                                    <ClearButton onClick={this.handleFilterClear}>{this.lang("clear")}</ClearButton>
                                </FilterContainer>
                            </CFlex>
                            <CardsWrapper col>
                                {this.bonuses.map(b => (
                                    <CardStyled key={b.id}>
                                        <CFlex grow={1} jc={CFlex.jc.between}>
                                            <CFlex col>
                                                <CardTitle>{b.title}</CardTitle>
                                                <CardDesc>{b.description}</CardDesc>
                                            </CFlex>
                                            <CFlex>
                                                <InputControl
                                                    onClick={() => this.handleClick(b.promocode)}
                                                    icon={<CopyIconStyled />}
                                                    disabled
                                                    label={this.lang("promocode")}
                                                    value={b.promocode}
                                                />
                                                <ButtonStyled>{this.lang("getBonus")}</ButtonStyled>
                                            </CFlex>
                                        </CFlex>
                                    </CardStyled>
                                ))}
                                {this.bonuses.length === 0 && (
                                    <NoDataMessage grow={1} ai={CFlex.ai.center} jc={CFlex.jc.center}>
                                        {this.lang("noData")}
                                    </NoDataMessage>
                                )}
                            </CardsWrapper>
                        </CFlex>
                    )}
                </PageContent>
                <DividerStyled />
            </MainPageWrapper>
        )
    }
}

const NoDataMessage = styled(CFlex)`
    font-size: 24px;
`

const DividerStyled = styled(Divider)`
    margin-top: 65px;
`

const ErrorStyled = styled.span`
    color: red;
    font-size: 28px;
`

const CardStyled = styled(Card)`
    &:not(:first-child) {
        margin-top: 24px;
    }
`
const CopyIconStyled = styled(CopyIcon)`
    color: ${props => props.theme.primary.main};
    cursor: pointer;
`
const ButtonStyled = styled(Button)`
    align-self: flex-end;
    background: ${props => props.theme.primary.main};
    border-radius: 4px;
    padding: 0 80px;
    margin-left: 24px;
`

const CardsWrapper = styled(CFlex)`
    /* overflow: auto; */
`
const ClearButton = styled(Button)`
    align-self: flex-end;
    margin-left: 8px;
    color: #262626;
    padding: 0 33px;
    border-radius: 4px;
`
const FilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 24px;
`
const StyledTitle = styled.h1`
    font-weight: 300;
    color: ${props => props.theme.secondary.main};
    font-size: 39px;
    margin-top: 0;
    margin-bottom: 16px;
    font-family: "Rubik";
`
const MainPageWrapper = styled.main`
    padding: 40px 32px 0;
    background-color: #f5f7fa;
    display: flex;
    flex-direction: column;
    /* overflow: auto; */
`
const PageContent = styled(CFlex)``
