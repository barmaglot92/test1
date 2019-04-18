import * as React from "react"
import "reflect-metadata"

export class StoreMap {
    private map: Map<any, any>

    constructor(storeConstructors: any[]) {
        this.map = new Map([])
        if (Array.isArray(storeConstructors) && storeConstructors.length > 0) {
            storeConstructors.forEach(storeConstructor => {
                const store = createStore(storeConstructor, this)
                this.map.set(storeConstructor, store)
            })
        }
    }

    public get(storeConstructor: any) {
        if (!this.map.has(storeConstructor)) {
            const store = createStore(storeConstructor, this)
            this.map.set(storeConstructor, store)
        }
        return this.map.get(storeConstructor)
    }

    public has(storeConstructor: any) {
        return this.map.has(storeConstructor)
    }

    public clear() {
        this.map.forEach(store => typeof store.clear === "function" && store.clear())
    }
}

const injectParameterStoreSymbol = Symbol("injectParameterStoreSymbol")

let injections: StoreMap = new StoreMap([])

export function initializeInject(stores: Array<any>) {
    injections = new StoreMap(stores)
}

export function clearStores() {
    injections.clear()
}

export function inject(target: any, propertyName: string, propertyIndex?: number): any {
    if (propertyName && propertyIndex === void 0) {
        return propertyDecorator(target, propertyName)
    } else if (!propertyName && propertyIndex !== void 0) {
        return parameterDecorator(target, propertyIndex)
    }
    newError("Decorator is to be applied to property, or to a constructor parameter", target)
}

function newError(message: string, target: any) {
    throw new Error(`${message}.${target ? ` Error occurred in ${target.name}` : ""}`)
}

function propertyDecorator<T>(target: any, propertyName: string) {
    if (!(target instanceof React.Component)) {
        newError("Inject store can implement only in React.Component", target)
    }

    const storeConstructor = Reflect.getMetadata("design:type", target, propertyName)

    checkValidDependency(target, storeConstructor)

    Object.defineProperty(target, propertyName, {
        get: function() {
            return injections.get(storeConstructor)
        },
    })
}

function parameterDecorator(target: any, parameterIndex: number) {
    const injectParameters = Reflect.getMetadata(injectParameterStoreSymbol, target) || []
    const parametersTypes = Reflect.getMetadata("design:paramtypes", target)
    checkValidDependency(target, parametersTypes[parameterIndex])
    injectParameters.push(parameterIndex)
    Reflect.defineMetadata(injectParameterStoreSymbol, injectParameters, target)
}

function checkValidDependency(target: any, storeConstructor: any) {
    if (!(storeConstructor && "constructor" in storeConstructor)) {
        newError("Dependency must have a constructor", target)
    }
    if (testNativeCode(storeConstructor)) {
        newError("Dependency may not be native implementation", target)
    }
}

function testNativeCode(storeConstructor: any) {
    const nativeCodeRegexp = /\{\s*\[native code\]\s*\}/
    return nativeCodeRegexp.test("" + storeConstructor)
}

function resolvedDependencies(target: any, storeMap: StoreMap, storeSet = new Set()) {
    const metadata = Reflect.getOwnMetadata(injectParameterStoreSymbol, target) || []
    const parametersTypes = Reflect.getMetadata("design:paramtypes", target) || []
    let ret = new Array(parametersTypes.length)
    storeSet.add(target)
    metadata.forEach((meta: any) => {
        const metaobj = parametersTypes[meta]
        if (!storeMap.has(metaobj)) {
            catchCyclicalDependencies(storeSet, metaobj)
            resolvedDependencies(metaobj, storeMap, storeSet)
        }
        ret[meta] = metaobj
    })
    storeSet.delete(target)
    return ret
}

function catchCyclicalDependencies(storeSet: Set<any>, metaobj: any) {
    if (storeSet.has(metaobj)) {
        const n = Array.from(storeSet.values())
            .map(function(value: {name: string}) {
                return value.name
            })
            .join(" -> ")
        newError('Cyclic dependencies are found in the following chain "' + n + '"', null)
    }
}

export function createStore(target: any, storeMap: StoreMap) {
    const n = resolvedDependencies(target, storeMap).map(function(e) {
        return storeMap.get(e)
    })
    return new target(...n)
}
