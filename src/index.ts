export function equalityCheckNParamsCreator(number: number) {
    return function(func, equalityCheck) {
        return memoizeEqualityCheckNParams(func, number, equalityCheck);
    }
}

export function defaultEqualityCheck(a, b) {
    return a === b;
}

export function memoizeEqualityCheckNParams(func, numberOfArgsToCheck: number, equalityCheck = defaultEqualityCheck) {
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
        lastArgs = args;
        return lastResult
    }
}
