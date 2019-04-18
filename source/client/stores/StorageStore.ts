import {localStorage} from "client/utils/localStorage"
import {APP_NAME} from "client/utils/appConfig"

interface IStorageStoreOptions {
    prefix: string
}

export class StorageStore {
    private prefix: string

    constructor(options: IStorageStoreOptions = {prefix: ""}) {
        this.prefix = `${APP_NAME}_${options.prefix}`
    }

    public set(key: string, value: any) {
        localStorage.set(`${this.prefix}_${key}`, value)
    }

    public get(key: string, defaultValue?: any) {
        const data = localStorage.get(`${this.prefix}_${key}`)
        if (typeof data === "undefined") {
            return defaultValue
        } else {
            return data
        }
    }

    public remove(key: string) {
        localStorage.remove(`${this.prefix}_${key}`)
    }

    public clearAll = () => {
        localStorage.clearAll()
    }
}
