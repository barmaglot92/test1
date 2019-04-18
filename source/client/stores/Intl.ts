import {BaseIntl} from "./base/BaseIntl"

export class Intl extends BaseIntl {
    locales = {
        en: require("../../translate/en_locale.json"),
        ru: require("../../translate/ru_locale.json"),
    }
}
