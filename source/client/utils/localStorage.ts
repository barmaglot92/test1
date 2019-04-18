let engine = require("store/src/store-engine")
let storages = [require("store/storages/localStorage")]
let store = engine.createStore(storages)

export const localStorage = store
