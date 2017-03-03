import { createSelectorCreator, createSelector } from 'reselect'
import { equalityCheckOnlyFirstArg } from '../src/index';

// describes marked with at * are the tests that vary from the reselect test cases
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

    it('*should only check the first argument when multiple keys are used', () => {
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

    it('*should allow the first argument to be an array', () => {
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
    });

    it('should memoize previous result before exception', () => {
        let called = 0;

        const selector = createSelectorOnlyCheckFirstArg(
            (state: any) => state.a,
            a => {
                called++;
                if(a > 1) throw Error('test error');
                return a
            }
        );

        const state1 = { a: 1 };
        const state2 = { a: 2 };
        expect(selector(state1)).toEqual(1);
        expect(function() {selector(state2)}).toThrow();
        expect(selector(state1)).toEqual(1);
        expect(called).toEqual(2);
    });

    it('should allow chained selectors', () => {
        const selector1 = createSelectorOnlyCheckFirstArg(
            state => state.sub,
            sub => sub
        );

        const selector2 = createSelectorOnlyCheckFirstArg(
            selector1,
            sub => sub.value
        );

        const state1 = { sub: { value: 1 } };
        expect(selector2(state1)).toEqual(1);
        expect(selector2(state1)).toEqual(1);
        expect(selector2.recomputations()).toBe(1);

        const state2 = { sub: {value: 2} };
        expect(selector2(state2)).toEqual(2);
        expect(selector2.recomputations()).toBe(2);
    });

    it('*should allow chained selectors with variadic args', () => {
        const selector1 = createSelectorOnlyCheckFirstArg(
            state => state.sub,
            (state, props, another) => props.x + another,
            (sub, x) => ({ sub, x })
        );

        const selector2 = createSelectorOnlyCheckFirstArg(
            selector1,
            (state, props) => props.y,
            (param: any, y) => param.sub.value + param.x + y
        );

        const state1 = { sub: {  value: 1 }};
        expect(selector2(state1, {x: 100, y: 200}, 100)).toEqual(401);
        expect(selector2(state1, {x: 100, y: 200}, 100)).toEqual(401);
        expect(selector2.recomputations()).toBe(1);

        // should ignore update to props and another
        expect(selector2(state1, {x: 100, y: 201}, 200)).toEqual(401);
        expect(selector2.recomputations()).toBe(1);

        const state2 = { sub: {  value: 2 }};
        expect(selector2(state2, {x: 100, y: 201}, 200)).toEqual(503);
        expect(selector2.recomputations()).toBe(2);
    })
});
