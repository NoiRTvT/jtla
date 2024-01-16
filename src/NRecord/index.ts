import {NArray} from "@/NArray";
import {NOptional} from "@/NOptional";
import {NKey, NRecordEntry} from "@/types";
import {NRecordType} from "./NRecord.types";
import {NTypeUtils} from "@/utils";

export class NRecord<U extends NKey, T> implements NRecordType<U, T> {
    private readonly map = new Map<U, T>();

    static empty<U extends NKey, T>() {
        return new NRecord<U, T>();
    }

    static new<U extends NKey, T>(...entries: NRecordEntry<U, T>[]) {
        return new NRecord(...entries);
    }

    constructor(...entries: NRecordEntry<U, T>[]) {
        entries.forEach(([key, value]) => this.map.set(key, value));
    }

    keys(): NArray<U> {
        return NArray.new(...this.map.keys());
    }

    values() {
        return NArray.new(...this.map.values());
    }

    entries(): NArray<[U, T]> {
        return NArray.new(...this.map.entries());
    }

    get(key?: U): T | undefined {
        if (NTypeUtils.isUndefinedOrNull(key)) return undefined
        return this.map.get(key!);
    }

    getOrDefault(key: U | undefined | null, defaultValue: T): T {
        if (NTypeUtils.isUndefinedOrNull(key)) return defaultValue
        return this.map.get(key!) ?? defaultValue;
    }

    getOptional(key?: U) {
        const value = NTypeUtils.isUndefinedOrNull(key) ? undefined : this.map.get(key!)
        return NOptional.newBy(value);
    }

    set(key: U, value: T): this {
        this.map.set(key, value);
        return this;
    }

    copy(): NRecord<U, T> {
        return new NRecord<U, T>(...this.map.entries());
    }

    remove(key: U): boolean {
        return this.map.delete(key)
    }
}
