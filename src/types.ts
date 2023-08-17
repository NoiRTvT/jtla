import {NMap} from "@/NMap";
import {NArray} from "@/NArray";

export type NBy<T, U> = ((value: T) => U)

export type NKey = string | number | symbol | undefined

// @ts-ignore
export type NRecord<T extends NKey, U> = Record<T | undefined, U>

export interface NCollection<T> {
    isEmpty(): boolean

    first(): (T | undefined)

    maxBy(by: NBy<T, number>): number

    minBy(by: NBy<T, number>): number

    toMapBy<U extends NKey>(byKey: NBy<T, U>): NMap<U, T>

    toMapBy<U extends NKey, V>(byKey: NBy<T, U>, byValue: NBy<T, V>): NMap<U, V>

    toGroupBy<U extends NKey, V extends NArray<T>>(by: NBy<T, U>): NMap<U, V>
}
