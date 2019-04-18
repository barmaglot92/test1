import {action, computed, observable} from "mobx"
import {AuthorizeCondition} from "@mediascope/core-lib-next/utils/types"
import {SessionEntity} from "./entities/SessionEntity"
import {AbstractAuthStore} from "@mediascope/core-lib-next/stores/AbstractAuthStore"
import {Session} from "../utils/types"
import {AuthApi} from "../api/AuthApi"
import {authApiService} from "@mediascope/core-lib-next/api"


export class AuthStore extends AbstractAuthStore {
    private static SESSION_NAME = process.env.SESSION_NAME

    private api = new AuthApi()

    @observable
    private _session: SessionEntity = null

    @observable
    private _authError: string = null

    public constructor() {
        super()
        authApiService.calculateHeaderFunction = this.getAuthHeaders
    }

    @action
    public async logout(): Promise<void> {
        window.sessionStorage.removeItem(AuthStore.SESSION_NAME)
        this._session = null
    }

    @action
    private setAuthError(err: string) {
        this._authError = err
    }

    @action
    protected async login(username: string, password: string): Promise<void> {
        try {
            this.setAuthState(AuthorizeCondition.LOGIN)
            const res = await this.api.auth(username, password)
            this._session = new SessionEntity(res)
            this.saveToCache()
            this.setAuthState(AuthorizeCondition.AUTHORIZED)
        } catch (error) {
            this.setAuthState(AuthorizeCondition.ERROR)
            if (error && error.response) {
                let errorAuthText = ""
                switch (error.response.status) {
                    case 401:
                        errorAuthText = "Wrong login or password"
                        break
                    case 403:
                        errorAuthText = "Access denied"
                        break
                    default:
                        errorAuthText = error.response.statusText
                        break
                }
                this.setAuthError(errorAuthText)
            }
            return Promise.reject(error)
        }
    }

    protected async refreshToken(): Promise<void> {
        //todo: create refreshToken functionality
    }

    public async signIn(userName: string, password: string) {
        return this.login(userName, password)
    }

    @computed
    public get authError() {
        return this._authError
    }

    public get session() {
        return this._session
    }

    @computed
    public get isSetValidToken() {
        return Boolean(this.session && this.session.token)
    }

    public loadFromCache() {
        const _session = window.sessionStorage.getItem(AuthStore.SESSION_NAME)
        let session: Session = null
        if (_session) {
            try {
                session = JSON.parse(_session)
                if (session.token) {
                    this._session = new SessionEntity(session)
                }
            } catch (err) {
                this._session = null
            }
        }
    }

    private saveToCache() {
        window.sessionStorage.setItem(AuthStore.SESSION_NAME, this._session.json)
    }

    private getAuthHeaders = () => {
        return {
            token: this.session.token
        }
    }
}
