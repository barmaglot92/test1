import Kernel from "./Kernel"
import {AppStore} from "./stores/AppStore"
import {initializeInject} from "./utils/inject"
import {LocaleStore} from "./stores/LocaleStore"

initializeInject([AppStore, LocaleStore])
new Kernel().run()
