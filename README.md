# reselect-equality-check-n-parameters

### A simple memoize factory function that only checks equality on the first n parameters

To be used as an extension to the reselect library

## Example:
```js
    // This creates a memoize function that will only check the first parameter
    const equalityCheckFirstParam = equalityCheckNParamsCreator(1);

    // Import createSelectorCreator from the reselect library passing it the memoize function
    const createSelectorFirstParam = createSelectorCreator(equalityCheckFirstParam);

    const selector = createSelectorFirstParam(
        state => state.a,
        state => state.b,
        (a, b) => a + b
    );

    const state1 = {a: 1, b: 2};
    selector(state1) // would be 3
    
    // b will not be check for equality
    // even if it has changed no new value will be calculated
    const state2 = {a: 1, b: 4};
    selector(state2) // would be 3
    selector.recomputations() // would be 1
    
    const state3 = {a: 2, b: 4};
    selector(state3) // would be 6
    selector(state3) // would be 2
    
```
