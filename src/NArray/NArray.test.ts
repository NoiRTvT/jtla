import {NArray} from "./index";
import {NTypeUtils} from "@/utils";

describe('NArray tests', () => {

    test('Check uniqBy method', () => {
        // given:
        const arr = NArray.new({a: 1}, {a: 2}, {a: 2}, {a: 3})

        // when:
        const uniqArr = arr.uniqBy(it => it.a)

        // then:
        expect(uniqArr.length).toBe(3)
    })

    test('Check toSet method', () => {
        // given:
        const arr = NArray.new(1, 2, 2, 3)

        // when:
        const setArr = arr.toSet()

        // then:
        expect(setArr.length).toBe(3)

        // when:
        setArr.push(3)

        // then:
        expect(setArr.length).toBe(3)

        // when:
        setArr.push(8)

        // then:
        expect(setArr.length).toBe(4)
    })

    test('Check toSetBy method', () => {
        // given:
        const arr = NArray.new({a: 1}, {a: 2}, {a: 2}, {a: 3})

        // when:
        const setArr = arr.toSetBy(it => it.a)

        // then:
        expect(setArr.length).toBe(3)

        // when:
        setArr.push({a: 3})

        // then:
        expect(setArr.length).toBe(3)

        // when:
        setArr.push({a: 7})

        // then:
        expect(setArr.length).toBe(4)
    })

    test('Check isEmpty method', () => {
        // given:
        const arr = NArray.empty()

        // when:
        let isEmpty = arr.isEmpty()

        // then:
        expect(isEmpty).toBe(true)

        // when:
        arr.push(1)
        isEmpty = arr.isEmpty()

        // then:
        expect(isEmpty).toBe(false)
    })

    test('Check first method', () => {
        // given:
        const arr = NArray.empty()

        // when:
        let first = arr.first()

        // then:
        expect(first).toBeUndefined()

        // when:
        arr.push(1)
        first = arr.first()

        // then:
        expect(first).toBe(1)
    })

    test('Check minBy method', () => {
        // given:
        const arr = NArray.new({a: 1}, {a: 2}, {a: -2}, {a: 3})

        // when:
        const min = arr.minBy(it => it.a)

        // then:
        expect(min).toBe(-2)
    })

    test('Check maxBy method', () => {
        // given:
        const arr = NArray.new({a: 1}, {a: 2}, {a: -2}, {a: 3})

        // when:
        const max = arr.maxBy(it => it.a)

        // then:
        expect(max).toBe(3)
    })

    test('Check recordBy method', () => {
        // given:
        const arr = NArray.new({a: 1}, {a: 2}, {b: 2}, {a: 3})
        // when:
        const record = arr.recordBy(it => it.a)

        // then:
        expect(record.keys().length).toBe(3)
        expect(record.keys().every(NTypeUtils.isNumber)).toBe(true)
        expect(record.values().length).toBe(3)
    })

    test('Check groupBy method', () => {
        // given:
        const arr = NArray.new({a: 1}, {a: 2},{a: 2}, {b: 2}, {a: 3})
        // when:
        const group = arr.groupBy(it => it.a)

        // then:
        expect(group.keys().length).toBe(3)
        expect(group.keys().every(NTypeUtils.isNumber)).toBe(true)
        expect(group.values().flatMap(it => it).length).toBe(4)
    })

    test('Check sumBy method', () => {
        // given:
        const arr = NArray.new({a: 1}, {a: 2},{a: 2}, {b: 2}, {a: 3})
        // when:
        const sum = arr.sumBy(it => it.a ?? 0)

        // then:
        expect(sum).toBe(8)
    })

    test('Check averageBy method', () => {
        // given:
        const arr = NArray.new({a: 1}, {a: 2},{a: 2}, {b: 2}, {a: 3})
        // when:
        const average = arr.averageBy(it => it.a ?? 0)

        // then:
        expect(average).toBe(1.6)
    })
});
