export declare function defaultEqualityCheck(a: any, b: any): boolean;
export declare function equalityCheckOnlyFirstArg(func: any, equalityCheck?: typeof defaultEqualityCheck): (...args: any[]) => any;
