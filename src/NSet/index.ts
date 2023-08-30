import { NArray } from "@/NArray";
import { NBy, NKey, NOrder } from "@/types";
import { NTypeUtils } from "@/utils";
import { NRecord } from "src/NRecord";
import { NSetArg, NSetType } from "./NSet.types";

export class NSet<T, U> implements NSetType<T> {
  private readonly map = new Map<U | T, T>();
  private readonly by: NBy<T, U> | undefined;
  length = 0;

  static new<T>(...array: NSetArg<T>) {
    return new NSet<T, T>(array);
  }

  static newBy<T, U>(by: NBy<T, U>, ...array: NSetArg<T>) {
    return new NSet(array, by);
  }

  static empty<T>() {
    return new NSet<T, T>([]);
  }

  private constructor(array: NSetArg<T>, by?: NBy<T, U>) {
    if (by) {
      this.by = by;
      array.forEach((it) => {
        const key = typeof by === "function" ? by(it) : by;
        if (!NTypeUtils.isUndefinedOrNull(key)) this.map.set(key, it);
      });
    } else
      array.forEach((it) => {
        if (!NTypeUtils.isUndefinedOrNull(it)) this.map.set(it, it);
      });
    this.updateMapValues();
  }

  private updateMapValues() {
    this.length = this.map.size;
  }

  forEach = this.toArray().forEach;

  push(...items: T[]) {
    items.forEach((it) => {
      if (this.by) this.map.set(this.by(it), it);
      else this.map.set(it, it);
    });
    this.updateMapValues();
  }

  isEmpty() {
    return this.length === 0;
  }

  first(): T | undefined {
    return this.toArray()[0];
  }

  minBy(by: NBy<T, number>): number {
    return this.toArray().minBy(by);
  }

  maxBy(by: NBy<T, number>): number {
    return this.toArray().maxBy(by);
  }

  toArray() {
    return NArray.new(...this.map.values());
  }

  toArrayBy<U>(by: NBy<T, U>) {
    const arr: U[] = [];
    for (const mapValue of this.map.values()) arr.push(by(mapValue));
    return NArray.new(...arr);
  }

  recordBy<U extends NKey>(byKey: NBy<T, U>): NRecord<U, T>;
  recordBy<U extends NKey, V>(
    byKey: NBy<T, U>,
    byValue: NBy<T, V>
  ): NRecord<U, V>;
  recordBy<U extends NKey, V>(byKey: NBy<T, U>, byValue?: NBy<T, V>) {
    const arr = this.toArray();
    return byValue ? arr.recordBy(byKey, byValue) : arr.recordBy(byKey);
  }

  groupBy<U extends NKey, V extends NArray<T>>(by: NBy<T, U>) {
    return this.toArray().groupBy<U, V>(by);
  }

  averageBy<U extends number>(by: NBy<T, U>): number {
    return this.toArray().averageBy(by);
  }

  sumBy<U extends number>(by: NBy<T, U>): number {
    return this.toArray().sumBy(by);
  }

  orderBy(by: NBy<T, unknown>, order: NOrder = NOrder.ASC): NArray<T> {
    return this.toArray().orderBy(by, order);
  }

  orderMultipleBy(bys: NBy<T, unknown>[], orders: NOrder[]): NArray<T> {
    return this.toArray().orderMultipleBy(bys, orders);
  }
}
