import {NMap} from "./index";

describe('NMap tests', () => {

    test('Check keys method', () => {
        // given:
        const map = NMap.new({
            a: 3,
            b:2,
            c: 8
    })

        // when:
        const keys = map.keys()

        // then:
        expect(keys.length).toBe(3)
    })

    test('Check values method', () => {
        // given:
        const map = NMap.new({
            a: 3,
            b:2,
            c: 8
        })

        // when:
        const values = map.values()

        // then:
        expect(values.length).toBe(3)
    })

    test('Check entries method', () => {
        // given:
        const map = NMap.new({
            a: 3,
            b:2,
            c: 8
        })

        // when:
        const entries = map.entries()

        // then:
        expect(entries.length).toBe(3)
        expect(entries[0][0]).toBe('a')
        expect(entries[0][1]).toBe(3)
        expect(entries[1][0]).toBe('b')
        expect(entries[1][1]).toBe(2)
        expect(entries[2][0]).toBe('c')
        expect(entries[2][1]).toBe(8)
    })

});
