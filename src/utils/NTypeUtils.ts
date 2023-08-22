import {isFinite} from "lodash";

export class NTypeUtils {
    // TODO: test
    static isUndefinedOrNull(value: unknown) {
        return value === undefined || value === null
    }

    // TODO: test
    static isNumber(value: number) {
        return Number(value) === value && !isFinite(value)
    }
}
