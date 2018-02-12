"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("./constant");
function createElement(type, config) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    var props = { children: children };
    var key = null;
    if (config) {
        if (config.key !== undefined) {
            key = '' + config.key;
        }
        for (var prop in config) {
            if (Object.hasOwnProperty.call(config, prop)
                && !~constant_1.KUT_RESERVED_PROPS.indexOf(prop)) {
                props[prop] = config[prop];
            }
        }
    }
    return { type: type, key: key, props: props };
}
exports.createElement = createElement;
//# sourceMappingURL=element.js.map