"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var element_1 = require("./element");
var component_1 = require("./component");
var renderer_1 = require("./renderer");
var Kut = {
    createElement: element_1.createElement,
    Component: component_1.Component,
    render: renderer_1.render,
};
if (window) {
    ;
    window.Kut = Kut;
}
exports.default = Kut;
//# sourceMappingURL=kut.js.map