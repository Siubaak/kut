import { KutElement, KutChild } from './element';
export declare class TextInstance {
    private element;
    private container;
    private node;
    constructor(element: number | string, container: HTMLElement);
    mount(): void;
    update(newElement: number | string): void;
    unmount(): void;
}
export declare class DOMInstance {
    private element;
    private container;
    private node;
    constructor(element: KutElement, container: HTMLElement);
    mount(): void;
    update(newElement: KutElement): void;
    unmount(): void;
}
export declare class ComponentInstance {
    private element;
    private container;
    private component;
    constructor(element: KutElement, container: HTMLElement);
    mount(): void;
    update(newElement: KutElement): void;
}
export declare function instantiate(element: KutChild, container: HTMLElement): TextInstance | DOMInstance | ComponentInstance;
