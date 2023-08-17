import {NSet} from "@/NSet";
import {NMap} from "@/NMap";
import {TypeUtils} from "@/utils";
import {NBy, NKey, NRecord} from "@/types";
import {NArrayType} from "./NArray.types";


export class NArray<T> extends Array<T> implements NArrayType<T> {
    static new<T>(array: T[]) {

        return  NArray.of(...array)  as NArray<T>
    }

    static empty<T>() {
        return new NArray<T>()
    }

    uniq() {
        const map = new Map<T, T>()
        this.forEach(it => map.set(it, it))
        return NArray.new<T>([...map.values()])
    }

    uniqBy<U>(by: NBy<T, U>) {
        const map = new Map<U, T>()
        this.forEach(it => map.set(by(it), it))
        return NArray.new<T>([...map.values()])
    }

    toSet() {
        return NSet.new(this)
    }

    toSetBy<U>(by: NBy<T, U>) {
        return NSet.newBy(this, by)
    }

    isEmpty() {
        return this.length === 0
    }

    first(): T | undefined {
        return this[0]
    }

    minBy(by: NBy<T, number>): number {
        const numbers = this.map(by)
        return Math.min(...numbers)
    }

    maxBy(by: NBy<T, number>): number {
        const numbers = this.map(by)
        return Math.max(...numbers)
    }

    toMapBy<U extends NKey>(byKey: NBy<T, U>): NMap<U, T>
    toMapBy<U extends NKey, V>(byKey: NBy<T, U>, byValue: NBy<T, V>): NMap<U, V>
    toMapBy<U extends NKey, V>(byKey: NBy<T, U>, byValue?: NBy<T, V>) {
        const result = this.reduce((acc, cur) => {
            const key = byKey(cur)
            if (!TypeUtils.isUndefinedOrNull(key)) acc[byKey(cur)] = byValue ? byValue(cur) : cur
            return acc
        }, {} as NRecord<U, T | V>)
        return NMap.new(result)
    }

    toGroupBy<U extends NKey, V extends NArray<T>>(by: NBy<T, U>) {
        const result = this.reduce((acc, cur) => {
            const key = by(cur)
            if (!TypeUtils.isUndefinedOrNull(key))
            {
                if (TypeUtils.isUndefinedOrNull(acc[key])) acc[key] = NArray.empty<T>() as V
                acc[key].push(cur)
            }
            return acc
        }, {} as NRecord<U, V>)
        return NMap.new(result)
    }
}
