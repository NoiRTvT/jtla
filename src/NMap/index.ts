import {NArray} from "@/NArray";
import {NKey, NRecord} from "@/types";
import {NMapType} from "./NMap.types";

export class NMap<U extends NKey, T> implements NMapType <U, T> {
    private map = new Map<U, T>()

    static new<U extends NKey, T>(record: NRecord<U, T>) {
        return new NMap(record)
    }

    constructor(record: NRecord<U, T>) {
        Object.entries(record).forEach(([key, value]) => {
            this.map.set(key as U, value as T)
        })
    }

    keys(): NArray<U> {
        return NArray.new([...this.map.keys()]);
    }

    values(){
        return NArray.new([...this.map.values()])
    }

    entries(): NArray<[U, T]> {
        return NArray.new([...this.map.entries()]);
    }
}
