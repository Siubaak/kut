"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("./component");
var constant_1 = require("./constant");
function instantiateComponent(element) {
    var instance = new element.type(element.props);
    var renderElement = instance.render(element.props);
    var node = render(renderElement);
    return node;
}
function createHTMLElement(element) {
    var node = document.createElement(element.type);
    var props = element.props;
    if (element.key) {
        node.setAttribute('key', element.key);
    }
    for (var prop in props) {
        if (prop === 'children') {
        }
        else if (prop === 'className') {
            node.className = props.className;
        }
        else if (prop === 'style') {
            for (var key in props.style) {
                if (node.style[key] !== undefined
                    && Object.hasOwnProperty.call(props.style, key)) {
                    node.style[key] = props.style[key];
                }
            }
        }
        else if (~constant_1.KUT_SUPPORTED_EVENT_HANDLERS.indexOf(prop.toLowerCase())
            && typeof props[prop] === 'function') {
            node[prop.toLowerCase()] = props[prop];
        }
        else {
            node.setAttribute(prop, props[prop]);
        }
    }
    props.children.forEach(function (child) {
        if (Array.isArray(child)) {
            child.forEach(function (c) { return node.appendChild(render(c)); });
        }
        else {
            node.appendChild(render(child));
        }
    });
    return node;
}
function render(element, container) {
    var node;
    if (typeof element === 'number' || typeof element === 'string') {
        node = document.createTextNode(element);
    }
    else if (typeof element.type === 'string') {
        node = createHTMLElement(element);
    }
    else if (typeof element.type === typeof component_1.Component) {
        node = instantiateComponent(element);
    }
    if (node !== undefined && container) {
        if (container.children.length) {
            container.removeChild(container.children[0]);
        }
        container.appendChild(node);
    }
    return node;
}
exports.render = render;
//# sourceMappingURL=render.js.map