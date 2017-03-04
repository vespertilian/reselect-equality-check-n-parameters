export function equalityCheckOnlyFirstArg(func, equalityCheck = defaultEqualityCheck) {
    let lastArgs = null;
    let lastResult = null;
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

export function equalityCheckNArgsCreator(number: number) {
    return function(func, equalityCheck) {
        return equalityCheckNArgs(func, number, equalityCheck);
    }
}

export function defaultEqualityCheck(a, b) {
    return a === b;
}

// reselect-equality-check-n-args
export function equalityCheckNArgs(func, numberOfArgsToCheck: number, equalityCheck = defaultEqualityCheck) {
    let lastArgs = null;
    let lastResult = null;
    const checkArgs = (args) => {
        let result = true;
        for(let i = 0; i < numberOfArgsToCheck; i++) {
            const isEqual = equalityCheck(args[i], lastArgs[i]);
            if(!isEqual) result = false;
        }
        return result;
    };

    return (...args) => {
        if (
            lastArgs === null ||
            lastArgs.length !== args.length ||
            !checkArgs(args)
        ) {
            lastResult = func(...args)
        }
        lastArgs = args
        return lastResult
    }
}
