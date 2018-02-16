import { Component } from './component';
import { TextInstance, DOMInstance, ComponentInstance } from './instance';
export declare type KutChild = number | string | KutElement;
export interface KutProps {
    children: (KutChild | KutChild[])[];
    [prop: string]: any;
}
export interface KutElement {
    type: string | typeof Component;
    key: string;
    props: KutProps;
    instance: TextInstance | DOMInstance | ComponentInstance;
}
export declare function createElement(type: string | typeof Component, config: any, ...children: (KutChild | KutChild[])[]): KutElement;
