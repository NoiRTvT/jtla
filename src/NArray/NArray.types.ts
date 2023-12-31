import {NArray} from "./index";
import {NSet} from "@/NSet";
import {NBy, NCollection} from "@/types";

export interface NArrayType<T> extends NCollection<T> {
    uniqBy<U>(by: NBy<T, U>): NArray<T>

    toSet(): NSet<T, T>

    toSetBy<U>(by: NBy<T, U>): NSet<T, U>

    // TODO: NOT TESTED
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): NArray<U>;
    filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): NArray<T>;
    flatMap<U, This = undefined> (
        callback: (this: This, value: T, index: number, array: T[]) => U | ReadonlyArray<U>,
        thisArg?: This
    ): NArray<U>
    //
}
