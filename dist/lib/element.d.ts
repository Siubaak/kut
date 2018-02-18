import { Component } from './component';
export declare type KutChild = number | string | KutElement;
export interface KutProps {
    children: KutChild[];
    [prop: string]: any;
}
export interface KutElement {
    type: string | typeof Component;
    key: string;
    ref: (node: Text | HTMLElement) => void;
    props: KutProps;
}
export declare function createElement(type: string | typeof Component, config: any, ...rawChildren: (KutChild | KutChild[])[]): KutElement;
