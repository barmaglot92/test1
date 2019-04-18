import {observable} from "mobx"
import {flowed} from "../utils/util"
import uuid from "uuid"

export class DataStore {
    @observable
    bonuses: IBonuses[] = []

    @observable
    header: IHeader | null = null

    @observable
    error: string | null = null

    @observable
    loading = false;

    @flowed
    *fetch() {
        this.loading = true

        try {
            const res = yield fetch("/data.json")
            const data: IDataReponse = yield res.json()

            this.bonuses = data.bonuses.map(b => ({...b, id: uuid.v4()}))
            this.header = data.header
        } catch (err) {
            this.error = err.toString()
        } finally {
            this.loading = false
        }
    }
}

interface IDataReponse {
    bonuses: IBonuses[]
    header: IHeader
}

interface IBonuses {
    title: string
    description: string
    link: string
    promocode: string
    id: string
}

interface IHeader {
    balance: number
    next_payout: number
    currency: string
}
