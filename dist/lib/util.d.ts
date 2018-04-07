export declare function getParentID(childID: string): string;
export declare function getNode(kutId: string): HTMLElement;
export declare function createNode(markup: string): Text | HTMLElement;
export declare function getClassString(className: any): string;
export declare function getStyleString(style: any): string;
export declare class DidMountSet {
    private _didMountHandlers;
    add(handler: () => void): void;
    exec(): void;
}
export declare const didMountSet: DidMountSet;
export declare class Heap<T> {
    private readonly _arr;
    private readonly _compare;
    constructor(compare: (contrast: T, self: T) => boolean);
    readonly length: number;
    push(item: T): void;
    shift(): T;
    private _heapify(i);
    private _promote(i);
    private _parent(i);
    private _left(i);
    private _right(i);
}
export declare function shallowEqual(prev: any, next: any): boolean;
