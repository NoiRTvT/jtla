import {NArray} from "@/NArray";
import {NBy, NCollection} from "@/types";

export interface NSetType<T> extends NCollection<T> {
    toArray(): NArray<T>
    toArrayBy<U>(by: NBy<T, U>): NArray<U>
}



export type NSetArg<T> = NArray<T> | T[]
