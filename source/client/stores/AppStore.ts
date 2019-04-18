import {LocaleStore} from "../stores/LocaleStore"
import {inject} from "../utils/inject"
import {computed} from "mobx"

export class AppStore {
    private localeStore: LocaleStore

    @computed
    public get language() {
        return this.localeStore.intl.locale
    }

    public constructor(@inject localeStore: LocaleStore) {
        this.localeStore = localeStore
    }
}
