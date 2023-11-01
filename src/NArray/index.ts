import { NRecord } from "@/NRecord";
import { NSet } from "@/NSet";
import { NBy, NKey, NOrder } from "@/types";
import { NTypeUtils } from "@/utils";
import _orderBy from "lodash/orderBy";
import { NArrayType } from "./NArray.types";

export class NArray<T> extends Array<T> implements NArrayType<T> {
  static new<T>(...array: T[]) {
    return NArray.of(...array) as NArray<T>;
  }

  static newBy<T>(array?: T[]) {
    if (!Array.isArray(array)) return NArray.empty<T>();
    return NArray.of(...array) as NArray<T>;
  }

  static empty<T>() {
    return new NArray<T>();
  }

  uniq() {
    const map = new Map<T, T>();
    this.forEach((it) => map.set(it, it));
    return NArray.new<T>(...map.values());
  }

  uniqBy<U>(by: NBy<T, U>) {
    const map = new Map<U, T>();
    this.forEach((it) => map.set(by(it), it));
    return NArray.new<T>(...map.values());
  }

  toSet() {
    return NSet.new(...this);
  }

  toSetBy<U>(by: NBy<T, U>) {
    return NSet.newBy(by, ...this);
  }

  isEmpty() {
    return this.length === 0;
  }

  first(): T | undefined {
    return this[0];
  }

  minBy(by: NBy<T, number>): number {
    const numbers = this.map(by);
    return Math.min(...numbers);
  }

  maxBy(by: NBy<T, number>): number {
    const numbers = this.map(by);
    return Math.max(...numbers);
  }

  minObjectBy(by: NBy<T, number>): T | undefined {
    let num= Infinity
    let minObject
    this.forEach(it => {
      const numBy = by(it)
      if(numBy < num) {
        minObject = it
        num=numBy
      }
    })
    return minObject
  }

  maxObjectBy(by: NBy<T, number>): T | undefined {
    let num = -Infinity
    let minObject
    this.forEach(it => {
      const numBy = by(it)
      if(numBy > num) {
        minObject = it
        num=numBy
      }
    })
    return minObject
  }

  recordBy<U extends NKey>(byKey: NBy<T, U>): NRecord<U, T>;
  recordBy<U extends NKey, V>(
    byKey: NBy<T, U>,
    byValue: NBy<T, V>
  ): NRecord<U, V>;
  recordBy<U extends NKey, V>(byKey: NBy<T, U>, byValue?: NBy<T, V>) {
    return this.reduce((acc, cur) => {
      const key = byKey(cur);
      if (!NTypeUtils.isUndefinedOrNull(key))
        acc.set(key, byValue ? byValue(cur) : cur);
      return acc;
    }, NRecord.empty<U, T | V>());
  }

  groupBy<U extends NKey, V extends NArray<T>>(by: NBy<T, U>) {
    return this.reduce((acc, cur) => {
      const key = by(cur);
      if (!NTypeUtils.isUndefinedOrNull(key)) {
        if (NTypeUtils.isUndefinedOrNull(acc.get(key)))
          acc.set(key, NArray.empty<T>() as V);
        acc.get(key)!.push(cur);
      }
      return acc;
    }, NRecord.empty<U, V>());
  }

  averageBy<U extends number>(by: NBy<T, U>, round?: number): number {
    if (this.length === 0) return 0;
    const value = this.sumBy(by) / this.length;
    if (NTypeUtils.isNumber(round)) return +value.toFixed(round);
    return value;
  }

  sumBy<U extends number>(by: NBy<T, U>): number {
    return this.reduce((acc, cur) => acc + by(cur), 0);
  }

  orderBy(by: NBy<T, unknown>, order: NOrder = NOrder.ASC): NArray<T> {
    // @ts-ignore
    return NArray.new(..._orderBy(this, [by], [order]));
  }

  orderMultipleBy(bys: NBy<T, unknown>[], orders: NOrder[]): NArray<T> {
    // @ts-ignore
    return NArray.new(..._orderBy(this, bys, orders));
  }

  map<U>(
    callbackfn: (value: T, index: number, array: T[]) => U,
    thisArg?: any
  ): NArray<U> {
    return super.map(callbackfn, thisArg) as unknown as NArray<U>;
  }

  filter(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): NArray<T> {
    return super.filter(predicate, thisArg) as unknown as NArray<T>;
  }

  flatMap<U, This = undefined>(
    callback: (
      this: This,
      value: T,
      index: number,
      array: T[]
    ) => U | ReadonlyArray<U>,
    thisArg?: This
  ): NArray<U> {
    return super.flatMap(callback, thisArg) as unknown as NArray<U>;
  }
}
