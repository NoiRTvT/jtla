import {NKey} from "@/types";
import {NArray} from "@/NArray";

export interface NMapType<U extends NKey, T> {
    keys(): NArray<U>

    entries(): NArray<[U, T]>

    values(): NArray<T>
}
