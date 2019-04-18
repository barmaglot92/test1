import {computed, observable} from "mobx"
import MessageFormat from "messageformat"

export class Intl {
    locales: {[index: string]: any} = {
        en: require("../../translate/en_locale.json"),
        ru: require("../../translate/ru_locale.json"),
    }

    @observable
    private _locale = "ru"

    @computed
    public get locale(): string {
        return this._locale
    }

    public set locale(value: string) {
        this._locale = value
    }

    public formatMessage = (
        namespace: string,
        id: string,
        values: {[key: string]: string | number | boolean | Date} = {}
    ): string => {
        const descriptor = this.locales[this.locale][`${namespace}.${id}`]
        if (!descriptor) {
            console.warn(`No translation for: ${namespace}.${id}`)
            return id
        }

        return new MessageFormat(this.locale).compile(descriptor.message)(values)
    }
}
