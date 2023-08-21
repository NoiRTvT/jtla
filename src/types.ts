import {NMap} from "@/NMap";
import {NArray} from "@/NArray";

export type NBy<T, U> = ((value: T) => U)

export type NKey = string | number | symbol | undefined

// @ts-ignore
export type NRecord<T extends NKey, U> = Record<T | undefined, U>

export enum NOrder {
    ASC = 'ASC',
    DESC = 'DESC'
}

export interface NCollection<T> {
    length: number

    isEmpty(): boolean

    first(): (T | undefined)

    maxBy(by: NBy<T, number>): number

    minBy(by: NBy<T, number>): number

    recordBy<U extends NKey>(byKey: NBy<T, U>): NMap<U, T>

    recordBy<U extends NKey, V>(byKey: NBy<T, U>, byValue: NBy<T, V>): NMap<U, V>

    groupBy<U extends NKey, V extends NArray<T>>(by: NBy<T, U>): NMap<U, V>

    sumBy<U extends number>(by: NBy<T, U>): number

    averageBy<U extends number>(by: NBy<T, U>): number

    orderBy<U extends NKey>(by: NBy<T, U>, order: NOrder): NArray<T>

    orderMultipleBy<U extends NKey>(bys: NBy<T, U>[], orders: NOrder[]): NArray<T>
}
