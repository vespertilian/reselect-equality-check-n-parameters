export declare function equalityCheckNParamsCreator(number: number): (func: any, equalityCheck: any) => (...args: any[]) => any;
export declare function defaultEqualityCheck(a: any, b: any): boolean;
export declare function memoizeEqualityCheckNParams(func: any, numberOfArgsToCheck: number, equalityCheck?: typeof defaultEqualityCheck): (...args: any[]) => any;
