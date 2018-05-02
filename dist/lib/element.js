"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("./constant");
var util_1 = require("./util");
function createElement(type, config) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    children = children.length ? [].concat.apply([], children) : [''];
    var props = { children: children };
    var key = null;
    var ref = null;
    if (config) {
        if (config.key != null) {
            key = ('' + config.key).replace(/:/g, '_');
        }
        if (config.ref && util_1.is.function(config.ref)) {
            ref = config.ref;
        }
        for (var prop in config) {
            if (Object.hasOwnProperty.call(config, prop)
                && !constant_1.KUT_RESERVED_PROPS[prop]) {
                props[prop] = config[prop];
            }
        }
        if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (var prop in defaultProps) {
                if (Object.hasOwnProperty.call(defaultProps, prop)
                    && !constant_1.KUT_RESERVED_PROPS[prop]
                    && (util_1.is.undefined(props[prop]) || util_1.is.null(props[prop]))) {
                    props[prop] = defaultProps[prop];
                }
            }
        }
    }
    return { type: type, key: key, ref: ref, props: props };
}
exports.createElement = createElement;
//# sourceMappingURL=element.js.map