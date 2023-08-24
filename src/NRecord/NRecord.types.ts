import {NKey} from "@/types";
import {NArray} from "@/NArray";

export interface NRecordType<U extends NKey, T> {
    keys(): NArray<U>

    entries(): NArray<[U, T]>

    values(): NArray<T>

    // TODO: NOT TESTED
    set(key: U, value: T): this
    get(key: U):T | undefined
    getOrDefault(key: U, defaultValue:T): T
    //
}
