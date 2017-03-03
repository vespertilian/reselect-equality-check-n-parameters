export declare function defaultEqualityCheck(a: any, b: any): boolean;
export declare function equalityCheckOnlyFirstArg(func: any, equalityCheck?: typeof defaultEqualityCheck): (...args: any[]) => any;
export declare class Foo {
    bar(str: any): string;
}
export declare function hello(str: string): string;
