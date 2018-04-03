"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("./component");
var instance_1 = require("./instance");
var util_1 = require("./util");
function instantiate(element) {
    var instance = null;
    if (typeof element === 'number' || typeof element === 'string') {
        instance = new instance_1.TextInstance(element);
    }
    else if (typeof element.type === 'string') {
        instance = new instance_1.DOMInstance(element);
    }
    else if (typeof element.type === typeof component_1.Component) {
        instance = new instance_1.ComponentInstance(element);
    }
    return instance;
}
exports.instantiate = instantiate;
function render(element, container) {
    var instance = instantiate(element);
    var markup = instance.mount('kut');
    container.innerHTML = markup;
    util_1.didMountSet.exec();
}
exports.render = render;
//# sourceMappingURL=renderer.js.map