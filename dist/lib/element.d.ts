import { Component } from './component';
export interface KutProps {
    children: (number | string | KutElement)[];
    [prop: string]: any;
}
export interface KutElement {
    type: string | typeof Component;
    key: string;
    props: KutProps;
}
export declare function createElement(type: string | typeof Component, config: any, ...children: (number | string | KutElement)[]): KutElement;
