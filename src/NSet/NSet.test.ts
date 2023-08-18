import {NSet} from "./index";

describe('NSet tests', () => {

    test('Check toArray method', () => {
        // given:
        const arr = NSet.new([1, 2, 2, 3])

        // when:
        const setArr = arr.toArray()

        // then:
        expect(setArr.length).toBe(3)

        // when:
        setArr.push(3)

        // then:
        expect(setArr.length).toBe(4)

        // when:
        setArr.push(8)

        // then:
        expect(setArr.length).toBe(5)
    })

    test('Check toArrayBy method', () => {
        // given:
        const arr = NSet.newBy([{a: 1}, {a: 2}, {a: 2}, {a: 3}], it => it.a)

        // when:
        const setArr = arr.toArrayBy(it => it.a)

        // then:
        expect(setArr.length).toBe(3)

        // when:
        setArr.push(3)

        // then:
        expect(setArr.length).toBe(4)

        // when:
        setArr.push(7)

        // then:
        expect(setArr.length).toBe(5)
    })

    test('Check isEmpty method', () => {
        // given:
        const arr = NSet.empty()

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
        const arr = NSet.empty()

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
        const arr = NSet.new([{a: 1}, {a: 2}, {a: -2}, {a: 3}])

        // when:
        const min = arr.minBy(it => it.a)

        // then:
        expect(min).toBe(-2)
    })

    test('Check maxBy method', () => {
        // given:
        const arr = NSet.new([{a: 1}, {a: 2}, {a: -2}, {a: 3}])

        // when:
        const max = arr.maxBy(it => it.a)

        // then:
        expect(max).toBe(3)
    })

    test('Check toMapBy method', () => {
        // given:
        const arr = NSet.new([{a: 1}, {a: 2}, {b: 2}, {a: 3}])
        // when:
        const map = arr.toMapBy(it => it.a)

        // then:
        expect(map.keys().length).toBe(3)
        expect(map.values().length).toBe(3)
    })

    test('Check toGroupBy method', () => {
        // given:
        const arr = NSet.new([{a: 1}, {a: 2},{a: 2}, {b: 2}, {a: 3}])
        // when:
        const group = arr.toGroupBy(it => it.a)

        // then:
        expect(group.keys().length).toBe(3)
        expect(group.values().flatMap(it => it).length).toBe(4)
    })

    test('Check sumBy method', () => {
        // given:
        const arr = NSet.newBy([{a: 1}, {a: 2},{a: 2}, {b: 2}, {a: 3}], it => it.a)
        // when:
        const sum = arr.sumBy(it => it.a ?? 0)

        // then:
        expect(sum).toBe(6)
    })

    test('Check averageBy method', () => {
        // given:
        const arr = NSet.newBy([{a: 1}, {a: 2},{a: 2}, {b: 2}, {a: 3}], it => it.a)
        // when:
        const average = arr.averageBy(it => it.a ?? 0)

        // then:
        expect(average).toBe(2)
    })
});
