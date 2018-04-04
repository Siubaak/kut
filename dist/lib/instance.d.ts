import { KutChild } from './element';
export declare type KutInstance = TextInstance | DOMInstance | ComponentInstance;
export declare class TextInstance {
    kutId: string;
    index: number;
    private _element;
    constructor(element: KutChild);
    readonly key: string;
    readonly node: HTMLElement;
    mount(kutId: string): string;
    shouldReceive(nextElement: KutChild): boolean;
    update(nextElement: KutChild): void;
    unmount(): void;
}
export declare class DOMInstance {
    kutId: string;
    index: number;
    private _element;
    private _childInstances;
    constructor(element: KutChild);
    readonly key: string;
    readonly node: HTMLElement;
    mount(kutId: string): string;
    shouldReceive(nextElement: KutChild): boolean;
    update(nextElement: KutChild): void;
    unmount(): void;
}
export declare class ComponentInstance {
    kutId: string;
    index: number;
    private _component;
    private _element;
    private _renderedInstance;
    constructor(element: KutChild);
    readonly key: string;
    readonly node: HTMLElement;
    mount(kutId: string): string;
    shouldReceive(nextElement: KutChild): boolean;
    update(nextElement: KutChild): void;
    unmount(): void;
}
