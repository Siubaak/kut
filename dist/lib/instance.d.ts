import { KutChild } from './element';
export declare type KutInstance = TextInstance | DOMInstance | ComponentInstance;
export declare class TextInstance {
    _index: number;
    _node: Text;
    private _element;
    private _container;
    constructor(element: KutChild);
    readonly key: string;
    mount(container: HTMLElement): Text;
    shouldReceive(nextElement: KutChild): boolean;
    update(nextElement: KutChild): void;
    unmount(): void;
}
export declare class DOMInstance {
    _index: number;
    _node: HTMLElement;
    private _element;
    private _container;
    private _childInstances;
    constructor(element: KutChild);
    readonly key: string;
    mount(container: HTMLElement): HTMLElement;
    shouldReceive(nextElement: KutChild): boolean;
    update(nextElement: KutChild): void;
    unmount(): void;
}
export declare class ComponentInstance {
    _index: number;
    _node: Text | HTMLElement;
    private _element;
    private _container;
    private _component;
    private _renderedInstance;
    constructor(element: KutChild);
    readonly key: string;
    mount(container: HTMLElement): Text | HTMLElement;
    shouldReceive(nextElement: KutChild): boolean;
    update(nextElement: KutChild, nextState?: any): void;
    unmount(): void;
}
