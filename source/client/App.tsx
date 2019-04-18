import {observer} from "mobx-react"
import * as React from "react"
import {Header} from "./components/Header"
import {SideBar} from "./components/SideBar"
import {MainPage} from "./pages/main"
import styled from "./utils/util"
import {DataStore} from "./stores/DataStore"
import {inject} from "./utils/inject"
import {Loader} from "./components/Loader"
import {CFlex} from "./components/CFlex"

@observer
export class App extends React.Component {
    @inject
    store: DataStore

    componentDidMount() {
        this.store.fetch()
    }

    render() {
        const {loading} = this.store
        return (
            <PageWrapper>
                <SideBarStyled />
                {loading ? (
                    <LoaderWrapperShadow ai={CFlex.ai.center} jc={CFlex.jc.center}>
                        <Loader color="#0085FF" thickness={5} size={100} />
                    </LoaderWrapperShadow>
                ) : (
                    <React.Fragment>
                        <HeaderStyled />
                        <MainPageStyled />
                        <Footer>© Travelpayouts, 2011–2018</Footer>
                    </React.Fragment>
                )}
            </PageWrapper>
        )
    }
}

const Footer = styled.footer`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    background-color: #f5f7fa;
    color: #a8a8a8;
    font-size: 13px;
    align-items: center;
    padding-right: 32px;
`

const LoaderWrapperShadow = styled(CFlex)`
    position: fixed;
    background: rgba(136, 147, 145, 0.5);
    width: 100vw;
    height: 100vh;
`

const HeaderStyled = styled(Header)``
const SideBarStyled = styled(SideBar)``
const MainPageStyled = styled(MainPage)``

const PageWrapper = styled.div`
    display: grid;
    grid-template-columns: 80px auto;
    grid-template-rows: 80px auto 52px;
    height: 100%;
    width: 100%;

    /* min width when interface looks good */
    min-width: 1000px;

    ${SideBarStyled} {
        grid-column: 1;
        grid-row: 1 / 4;
    }

    ${HeaderStyled} {
        grid-column: 2;
        grid-row: 1;
    }
`
