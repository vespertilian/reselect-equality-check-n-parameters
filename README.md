# reselect-equality-check-n-parameters

#### A simple memoize factory function that only checks equality on the first n parameters

To be used as an extension to the [reselect] library.

[reselect]: https://github.com/reactjs/reselect

## Install:
    npm install reselect-equality-check-n-parameters --save

## Example:
```js
    import { createSelectorCreator } from 'reselect';
    import { equalityCheckNParamsCreator } from 'reselect-equality-check-n-parameters';
    
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

```


## NPM tasks

- `npm test` runs the tests via karma
- `npm build` builds a UMD version for distribution with webpack
- `npm pre-publish` used when publishing to NPM

## Publishing checklist

1. Run tests `npm test`
2. Run build and check that your module was built (needs to be exported via index.ts to index.js)
3. Install it into your project to test before publishing by running `npm install '/path-to-this/'`
4. Bump version in package.json following [Semantic Versioning] SemVer
5. Tag the release commit in git: `git tag -a v0.1.5 -m "Published v0.1.5"`
6. Push the tags up to github: `git push origin --tags`
7. Publish `npm publish`

[Semantic Versioning]: http://semver.org/
