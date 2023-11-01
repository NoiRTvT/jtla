import {NArray} from "@/NArray";
import {NRecord} from "@/NRecord";

export type NBy<T, U> = (value: T) => U;

export type NKey = string | number | symbol | undefined;

// @ts-ignore
export type NRecordObject<T extends NKey, U> = Record<T | undefined, U>;

export type NRecordEntry<T extends NKey, U> = [T, U];

export enum NOrder {
    ASC = "asc",
    DESC = "desc",
}

export interface NCollection<T> {
    length: number;

    isEmpty(): boolean;

    first(): T | undefined;

    maxBy(by: NBy<T, number>): number;

    minBy(by: NBy<T, number>): number;



    recordBy<U extends NKey>(byKey: NBy<T, U>): NRecord<U, T>;

    recordBy<U extends NKey, V>(
        byKey: NBy<T, U>,
        byValue: NBy<T, V>
    ): NRecord<U, V>;

    groupBy<U extends NKey, V extends NArray<T>>(by: NBy<T, U>): NRecord<U, V>;

    sumBy<U extends number>(by: NBy<T, U>): number;

    averageBy<U extends number>(by: NBy<T, U>): number;

    // TODO: NOT TESTED
    orderBy(by: NBy<T, unknown>, order: NOrder): NArray<T>;

    orderMultipleBy(bys: NBy<T, unknown>[], orders: NOrder[]): NArray<T>;

    minObjectBy(by: NBy<T, number>): T | undefined

    maxObjectBy(by: NBy<T, number>): T | undefined

    //
}
