"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var instance_1 = require("./instance");
function render(element, container) {
    var instance = instance_1.instantiate(element, container);
    instance.mount();
}
exports.render = render;
//# sourceMappingURL=renderer.js.map