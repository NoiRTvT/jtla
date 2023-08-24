import {NRecord} from "@/NRecord";
import {NArray} from "@/NArray";

export type NBy<T, U> = ((value: T) => U)

export type NKey = string | number | symbol | undefined

// @ts-ignore
export type NRecordObject<T extends NKey, U> = Record<T | undefined, U>

export type NRecordEntry<T extends NKey, U> = [T, U]

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

    recordBy<U extends NKey>(byKey: NBy<T, U>): NRecord<U, T>

    recordBy<U extends NKey, V>(byKey: NBy<T, U>, byValue: NBy<T, V>): NRecord<U, V>

    groupBy<U extends NKey, V extends NArray<T>>(by: NBy<T, U>): NRecord<U, V>

    sumBy<U extends number>(by: NBy<T, U>): number

    averageBy<U extends number>(by: NBy<T, U>): number

    // TODO: NOT TESTED
    orderBy<U extends NKey>(by: NBy<T, U>, order: NOrder): NArray<T>
    orderMultipleBy<U extends NKey>(bys: NBy<T, U>[], orders: NOrder[]): NArray<T>
    //
}
