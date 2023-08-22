import _orderBy from 'lodash/orderBy'
import {NSet} from "@/NSet";
import {NRecord} from "@/NRecord";
import {NTypeUtils} from "@/utils";
import {NBy, NKey, NOrder, NRecordObject} from "@/types";
import {NArrayType} from "./NArray.types";

export class NArray<T> extends Array<T> implements NArrayType<T> {

    static new<T>(...array: T[]) {
        return NArray.of(...array) as NArray<T>
    }

    static empty<T>() {
        return new NArray<T>()
    }

    uniq() {
        const map = new Map<T, T>()
        this.forEach(it => map.set(it, it))
        return NArray.new<T>(...map.values())
    }

    uniqBy<U>(by: NBy<T, U>) {
        const map = new Map<U, T>()
        this.forEach(it => map.set(by(it), it))
        return NArray.new<T>(...map.values())
    }

    toSet() {
        return NSet.new(...this)
    }

    toSetBy<U>(by: NBy<T, U>) {
        return NSet.newBy(by, ...this)
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

    recordBy<U extends NKey>(byKey: NBy<T, U>): NRecord<U, T>
    recordBy<U extends NKey, V>(byKey: NBy<T, U>, byValue: NBy<T, V>): NRecord<U, V>
    recordBy<U extends NKey, V>(byKey: NBy<T, U>, byValue?: NBy<T, V>) {
        const result = this.reduce((acc, cur) => {
            const key = byKey(cur)
            if (!NTypeUtils.isUndefinedOrNull(key)) acc[byKey(cur)] = byValue ? byValue(cur) : cur
            return acc
        }, {} as NRecordObject<U, T | V>)
        return NRecord.new(result)
    }

    groupBy<U extends NKey, V extends NArray<T>>(by: NBy<T, U>) {
        const result = this.reduce((acc, cur) => {
            const key = by(cur)
            if (!NTypeUtils.isUndefinedOrNull(key)) {
                if (NTypeUtils.isUndefinedOrNull(acc[key])) acc[key] = NArray.empty<T>() as V
                acc[key].push(cur)
            }
            return acc
        }, {} as NRecordObject<U, V>)
        return NRecord.new(result)
    }

    averageBy<U extends number>(by: NBy<T, U>): number {
        if (this.length === 0) return 0
        return this.sumBy(by) / this.length;
    }

    sumBy<U extends number>(by: NBy<T, U>): number {
        return this.reduce((acc, cur) => acc + by(cur), 0);
    }

    orderBy<U extends NKey>(by: NBy<T, U>, order: NOrder = NOrder.ASC): NArray<T> {
        // @ts-ignore
        return NArray.new(..._orderBy(this, [by], [order]));
    }

    orderMultipleBy<U extends NKey>(bys: NBy<T, U>[], orders: NOrder[]): NArray<T> {
        // @ts-ignore
        return NArray.new(..._orderBy(this, bys, orders))
    }

    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): NArray<U> {
        return super.map(callbackfn, thisArg) as unknown as NArray<U>
    }

    filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): NArray<T> {
        return super.filter(predicate, thisArg) as unknown as NArray<T>
    }

    flatMap<U, This = undefined> (
        callback: (this: This, value: T, index: number, array: T[]) => U | ReadonlyArray<U>,
        thisArg?: This
    ): NArray<U> {
        return super.flatMap(callback,thisArg)  as unknown as NArray<U>
    }
}


