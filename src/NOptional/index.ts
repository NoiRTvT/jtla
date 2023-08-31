import { NTypeUtils } from "..";
import { NOptionalType } from "./NOptional.types";

export class NOptional<T> implements NOptionalType<T> {
  private value: T;

  static newBy<T>(value: T) {
    return new NOptional(value);
  }

  private constructor(value: T) {
    this.value = value;
  }

  map<U>(func: (it: NonNullable<T>) => U): NOptional<U> {
    const newValue = NTypeUtils.isUndefinedOrNull(this.value)
      ? undefined
      : func(this.value!);
    return NOptional.newBy(newValue as U);
  }

  orElse<U>(value: NonNullable<U>): NonNullable<T | U> {
    if (NTypeUtils.isUndefinedOrNull(this.value)) return value;
    return this.value!;
  }
}
