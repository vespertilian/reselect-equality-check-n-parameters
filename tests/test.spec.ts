import { createSelectorCreator, createSelector } from 'reselect'
import { equalityCheckOnlyFirstArg } from '../src/index';

describe('equalityCheckOnlyFirstArg', () => {
    const createSelectorOnlyCheckFirstArg = createSelectorCreator(equalityCheckOnlyFirstArg)

    it('should work the same as the basic selector', () => {
        const selector = createSelectorOnlyCheckFirstArg(
            (state: any) => state.a,
            a => a
        ) as any;
        expect(selector({a: 1})).toBe(1);
        expect(selector({a: 1})).toBe(1);
        expect(selector.recomputations()).toBe(1);
        expect(selector({a: 2})).toBe(2);
        expect(selector.recomputations()).toBe(2);
    });

    it('should only check the first argument when multiple keys are used', () => {
        const selector = createSelectorOnlyCheckFirstArg(
            (state: any) => state.a,
            (state: any) => state.b,
            (a, b) => a + b
        );

        const state1 = {a: 1, b: 2};
        expect(selector(state1)).toBe(3);
        expect(selector(state1)).toBe(3);
        expect(selector.recomputations()).toBe(1);
        // should ignore update to b
        const state2 = {a: 1, b: 3};
        expect(selector(state2)).toBe(3);
        expect(selector.recomputations()).toBe(1);
        const state3 = {a: 2, b: 2};
        expect(selector(state3)).toBe(4);
        expect(selector.recomputations()).toBe(2);
    });

    it('should throw an error if a function is not passed in', () => {
        expect(function() {
            createSelectorOnlyCheckFirstArg(
                (state: any)=> state.a,
                'not a function' as any,
                (a, b) => a + b
            )
        }).toThrow()
    });

    it('should memoize composite arguments', () => {
        const selector = createSelectorOnlyCheckFirstArg(
            (state: any) => state.sub,
            sub => sub
        );

        const state1 = { sub: { a: 1 }};
        expect(selector(state1)).toBe(state1.sub);
        expect(selector(state1)).toBe(state1.sub);
        expect(selector.recomputations()).toBe(1);
        const state2 = { sub: { a: 2 }};
        expect(selector(state2)).toBe(state2.sub);
        expect(selector.recomputations()).toBe(2);
    });

    it('should allow the first argument to be an array', () => {
        const selector = createSelectorOnlyCheckFirstArg(
            [state => state.a, state => state.b],
            (a, b) => {
                return a + b;
            }
        );

        const state1 = {a: 1, b: 2};
        expect(selector(state1)).toBe(3);
        expect(selector(state1)).toBe(3);
        expect(selector.recomputations()).toBe(1);
        // should ignore update to b
        const state2 = {a: 1, b: 3};
        expect(selector(state2)).toBe(3);
        expect(selector.recomputations()).toBe(1);
        const state3 = {a: 2, b: 2};
        expect(selector(state3)).toBe(4);
        expect(selector.recomputations()).toBe(2);
    });

    it('should recompute result after exception', () => {
        let called = 0;

        const selector = createSelectorOnlyCheckFirstArg(
            (state: any) => state.a,
            a => {
                called++;
                throw Error('test error')
            }
        );
        expect(function() {selector({a: 1})}).toThrow();
        expect(function() {selector({a: 1})}).toThrow();
        expect(called).toEqual(2);
    })
});
