import {autorun} from "mobx"
import {inject} from "@mediascope/core-lib-next/utils/inject"
import {Intl} from "./Intl"
import {StorageStore} from "./StorageStore"

export class LocaleStore {
    static STORE_PREFIX = "LOCALE"

    intl: Intl

    store = new StorageStore({
        prefix: LocaleStore.STORE_PREFIX,
    })

    constructor(@inject intl: Intl) {
        this.intl = intl
        this.intl.locale = this.store.get(LocaleStore.STORE_PREFIX, this.getLocale())

        autorun(this.saveLocale)
    }

    private getLocale = () => {
        return "ru"
    }

    private saveLocale = () => {
        this.store.set(LocaleStore.STORE_PREFIX, this.intl.locale)
    }
}
