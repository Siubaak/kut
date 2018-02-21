import { KutChild } from './element';
import { KutInstance } from './instance';
export declare function instantiate(element: KutChild): KutInstance;
export declare function render(element: KutChild, container?: HTMLElement): void | string;
