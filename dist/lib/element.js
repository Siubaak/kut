"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("./constant");
function createElement(type, config) {
    var rawChildren = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rawChildren[_i - 2] = arguments[_i];
    }
    var children = rawChildren.length
        ? [].concat.apply([], rawChildren) : [''];
    var props = { children: children };
    var key = null;
    var ref = null;
    if (config) {
        if (config.key != null) {
            key = ('' + config.key).replace(/:/g, '.');
        }
        if (typeof config.ref === 'function') {
            ref = config.ref;
        }
        for (var prop in config) {
            if (Object.hasOwnProperty.call(config, prop)
                && !constant_1.KUT_RESERVED_PROPS[prop]) {
                props[prop] = config[prop];
            }
        }
    }
    return { type: type, key: key, ref: ref, props: props };
}
exports.createElement = createElement;
//# sourceMappingURL=element.js.map