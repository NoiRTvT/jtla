import {NArray} from "@/NArray";
import {NKey, NRecordObject} from "@/types";
import {NRecordType} from "./NRecord.types";

export class NRecord<U extends NKey, T> implements NRecordType <U, T> {
    private readonly map = new Map<U, T>()

    static new<U extends NKey, T>(record: NRecordObject<U, T>) {
        return new NRecord(record)
    }

    constructor(record: NRecordObject<U, T>) {
        Object.entries(record).forEach(([key, value]) => {
            this.map.set(key as U, value as T)
        })
    }

    keys(): NArray<U> {
        return NArray.new(...this.map.keys());
    }

    values() {
        return NArray.new(...this.map.values())
    }

    entries(): NArray<[U, T]> {
        return NArray.new(...this.map.entries());
    }

    get(key: U): T | undefined {
        return this.map.get(key);
    }

    getOrDefault(key: U, defaultValue: T): T {
        return this.map.get(key) ?? defaultValue
    }
}
