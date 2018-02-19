"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("./constant");
function setProps(node, props, comparedProps) {
    for (var prop in props) {
        if (prop === 'children') {
            continue;
        }
        else if (prop === 'className'
            && (!comparedProps || comparedProps.className !== props.className)) {
            if (typeof props.className === 'object') {
                node.className =
                    Object.keys(props.className)
                        .filter(function (cls) { return props.className[cls]; })
                        .join(' ');
            }
            else if (Array.isArray(props.className)) {
                node.className = props.className.join(' ');
            }
            else {
                node.className = props.className.toString();
            }
        }
        else if (prop === 'style'
            && (!comparedProps || comparedProps.style !== props.style)) {
            node.style.cssText = '';
            if (typeof props.style === 'object') {
                for (var key in props.style) {
                    if (node.style[key] !== undefined
                        && Object.hasOwnProperty.call(props.style, key)) {
                        node.style[key] = props.style[key];
                    }
                }
            }
            else {
                node.setAttribute('style', props.style.toString());
            }
        }
        else if (prop === 'value'
            && (!comparedProps || comparedProps.value !== props.value)) {
            node.value = props.value;
        }
        else if (constant_1.KUT_SUPPORTED_EVENT_HANDLERS[prop.toLowerCase()]
            && typeof props[prop] === 'function'
            && (!comparedProps || comparedProps[prop] !== props[prop])) {
            node[prop.toLowerCase()] = props[prop];
        }
        else if (!comparedProps || comparedProps[prop] !== props[prop]) {
            node.setAttribute(prop, props[prop]);
        }
    }
}
exports.setProps = setProps;
//# sourceMappingURL=util.js.map