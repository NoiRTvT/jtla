import {NArray} from "@/NArray";
import {NMap} from "@/NMap";
import {NBy, NKey} from "@/types";
import {NSetArg, NSetType} from "./NSet.types";
import {TypeUtils} from "@/utils";

export class NSet<T, U> implements NSetType <T> {
    private map = new Map<U | T, T>()
    private mapValues = NArray.empty<T>()
    private by: NBy<T, U> | undefined
    length = 0

    static new<T>(array: NSetArg<T>) {
        return new NSet<T, T>(array)
    }

    static newBy<T, U>(array: NSetArg<T>, by: NBy<T, U>) {
        return new NSet(array, by)
    }

    static empty<T>() {
        return new NSet<T, T>([])
    }

    private constructor(array: NSetArg<T>, by?: NBy<T, U>) {
        if (by) {
            this.by = by
            array.forEach((it) => {
                const key = typeof by === 'function' ? by(it) : by
                if (!TypeUtils.isUndefinedOrNull(key))
                    this.map.set(key, it)
            })

        } else array.forEach((it) => {
            if (!TypeUtils.isUndefinedOrNull(it))
                this.map.set(it, it)
        })
        this.updateMapValues()
    }

    private updateMapValues() {
        const values = [...this.map.values()]
        this.mapValues = NArray.new(values)
        this.length = values.length
    }

    forEach = this.mapValues.forEach

    push(...items: T[]) {
        items.forEach(it => {
            if (this.by) this.map.set(this.by(it), it)
            else this.map.set(it, it)
        })
        this.updateMapValues()
    }

    isEmpty() {
        return this.mapValues.length === 0
    }

    first(): T | undefined {
        return this.mapValues[0]
    }

    minBy(by: NBy<T, number>): number {
        return this.toArray().minBy(by)
    }

    maxBy(by: NBy<T, number>): number {
        return this.toArray().maxBy(by)
    }

    toArray() {
        return this.mapValues
    }

    toArrayBy<U>(by: NBy<T, U>) {
        return NArray.new(this.mapValues.map(by))
    }

    toMapBy<U extends NKey>(byKey: NBy<T, U>): NMap<U, T>
    toMapBy<U extends NKey, V>(byKey: NBy<T, U>, byValue: NBy<T, V>): NMap<U, V>
    toMapBy<U extends NKey, V>(byKey: NBy<T, U>, byValue?: NBy<T, V>) {
        const arr = this.toArray()
        return byValue ? arr.toMapBy(byKey, byValue) : arr.toMapBy(byKey)
    }

    toGroupBy<U extends NKey, V extends NArray<T>>(by: NBy<T, U>) {
        return this.toArray().toGroupBy<U, V>(by)
    }

    averageBy<U extends number>(by: NBy<T, U>): number {
        return this.toArray().averageBy(by)
    }

    sumBy<U extends number>(by: NBy<T, U>): number {
        return this.toArray().sumBy(by)
    }
}
