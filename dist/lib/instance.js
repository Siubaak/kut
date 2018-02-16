"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("./constant");
var component_1 = require("./component");
var TextInstance = (function () {
    function TextInstance(element, container) {
        this.element = element;
        this.container = container;
    }
    TextInstance.prototype.mount = function () {
        this.node = document.createTextNode(this.element);
        this.container.appendChild(this.node);
    };
    TextInstance.prototype.update = function (newElement) {
        if (this.element !== newElement) {
            var oldNode = this.node;
            this.element = newElement;
            this.node = document.createTextNode(newElement);
            this.container.replaceChild(this.node, oldNode);
        }
    };
    TextInstance.prototype.unmount = function () {
        this.container.removeChild(this.node);
    };
    return TextInstance;
}());
exports.TextInstance = TextInstance;
var DOMInstance = (function () {
    function DOMInstance(element, container) {
        this.element = element;
        this.element.instance = this;
        this.container = container;
    }
    DOMInstance.prototype.mount = function () {
        var _this = this;
        this.node = document.createElement(this.element.type);
        var props = this.element.props;
        if (this.element.key) {
            this.node.setAttribute('key', this.element.key);
        }
        for (var prop in this.element.props) {
            if (prop === 'children') {
            }
            else if (prop === 'className') {
                this.node.className = props.className;
            }
            else if (prop === 'style') {
                for (var key in props.style) {
                    if (this.node.style[key] !== undefined
                        && Object.hasOwnProperty.call(props.style, key)) {
                        this.node.style[key] = props.style[key];
                    }
                }
            }
            else if (constant_1.KUT_SUPPORTED_EVENT_HANDLERS[prop.toLowerCase()]
                && typeof props[prop] === 'function') {
                this.node[prop.toLowerCase()] = props[prop];
            }
            else {
                this.node.setAttribute(prop, props[prop]);
            }
        }
        props.children.forEach(function (child) {
            if (Array.isArray(child)) {
                child.forEach(function (c) {
                    var instance = instantiate(c, _this.node);
                    instance.mount();
                });
            }
            else {
                var instance = instantiate(child, _this.node);
                instance.mount();
            }
        });
        this.container.appendChild(this.node);
    };
    DOMInstance.prototype.update = function (newElement) {
    };
    DOMInstance.prototype.unmount = function () {
        this.container.removeChild(this.node);
    };
    return DOMInstance;
}());
exports.DOMInstance = DOMInstance;
var ComponentInstance = (function () {
    function ComponentInstance(element, container) {
        this.element = element;
        this.element.instance = this;
        this.container = container;
    }
    ComponentInstance.prototype.mount = function () {
        var type = this.element.type;
        var ComponentConstructor = type;
        this.component = new ComponentConstructor(this.element.props);
        this.component.instance = this;
        this.component.componentWillMount();
        var renderElement = this.component.render();
        var instance = instantiate(renderElement, this.container);
        instance.mount();
        this.component.componentDidMount();
    };
    ComponentInstance.prototype.update = function (newElement) {
        this.component.componentWillUpdate();
        if (this.component.shouldComponentUpdate()) {
            var instance = instantiate(newElement, this.container);
            while (this.container.lastChild) {
                this.container.removeChild(this.container.lastChild);
            }
            instance.mount();
        }
        this.element = newElement;
        this.element.instance = this;
        this.component.componentDidUpdate();
    };
    return ComponentInstance;
}());
exports.ComponentInstance = ComponentInstance;
function instantiate(element, container) {
    var instance = null;
    if (typeof element === 'number' || typeof element === 'string') {
        instance = new TextInstance(element, container);
    }
    else if (typeof element.type === 'string') {
        instance = new DOMInstance(element, container);
    }
    else if (typeof element.type === typeof component_1.Component) {
        instance = new ComponentInstance(element, container);
    }
    return instance;
}
exports.instantiate = instantiate;
//# sourceMappingURL=instance.js.map