import {NKey} from "@/types";
import {NArray} from "@/NArray";

export interface NObjectType<U extends NKey, T> {
    keys(): NArray<U>
    entries(): NArray<[U, T]>
}
