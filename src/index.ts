export function defaultEqualityCheck(a, b) {
    return a === b;
}

// reselect-equality-check-n-args
export function equalityCheckOnlyFirstArg(func, equalityCheck = defaultEqualityCheck) {
    let lastArgs = null
    let lastResult = null
    // const isEqualToLastArg = (value, index) => equalityCheck(value, lastArgs[index])
    const firstArgsEqual = (arg1) => equalityCheck(arg1, lastArgs[0]);
    return (...args) => {
        if (
            lastArgs === null ||
            lastArgs.length !== args.length ||
            !firstArgsEqual(args[0])
        ) {
            lastResult = func(...args)
        }
        lastArgs = args;
        return lastResult
    }
}
