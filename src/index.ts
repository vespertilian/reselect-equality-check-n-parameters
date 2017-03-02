export function defaultEqualityCheck(a, b) {
    return a === b;
}

// reselect-equality-check-n-args
export function equalityCheckOnlyFirstArg(func, equalityCheck = defaultEqualityCheck) {
    let lastArg = null;
    let lastResult = null;
    return (...args) => {
        console.log('memoize function');
        if (
            lastArg !== null &&
            equalityCheck(lastArg, args[0])
        ) {
            return lastResult;
        }
        lastArg = args[0];
        lastResult = func(...args);
        return lastResult;
    };
}