import { KutChild } from './element';
export declare type KutInstance = TextInstance | DOMInstance | ComponentInstance;
export declare class TextInstance {
    private _element;
    private _container;
    private _node;
    constructor(element: KutChild);
    mount(container: HTMLElement): Text;
    update(nextElement: KutChild): void;
    unmount(): void;
}
export declare class DOMInstance {
    private _element;
    private _container;
    private _node;
    private _childInstances;
    constructor(element: KutChild);
    mount(container: HTMLElement): HTMLElement;
    update(nextElement: KutChild): void;
    unmount(): void;
}
export declare class ComponentInstance {
    private _element;
    private _container;
    private _node;
    private _component;
    private _renderedInstance;
    constructor(element: KutChild);
    mount(container: HTMLElement): Text | HTMLElement;
    update(nextElement: KutChild, nextState?: any): void;
    unmount(): void;
}
