import { createElement } from './element';
import { Component } from './component';
import { render } from './render';
declare const Kut: {
    createElement: typeof createElement;
    Component: typeof Component;
    render: typeof render;
};
export default Kut;
