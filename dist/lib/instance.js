"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = require("./renderer");
var constant_1 = require("./constant");
var diff_1 = require("./diff");
var TextInstance = (function () {
    function TextInstance(element) {
        this._index = 0;
        this._element = element;
    }
    Object.defineProperty(TextInstance.prototype, "key", {
        get: function () {
            return '_index_' + this._index;
        },
        enumerable: true,
        configurable: true
    });
    TextInstance.prototype.mount = function (container) {
        this._container = container;
        this._node = document.createTextNode(this._element);
        return this._node;
    };
    TextInstance.prototype.shouldReceive = function (nextElement) {
        return (typeof nextElement === 'number' || typeof nextElement === 'string')
            && ('' + nextElement) === ('' + this._element);
    };
    TextInstance.prototype.update = function (nextElement) {
        nextElement = nextElement == null ? this._element : nextElement;
        this._element = nextElement;
    };
    TextInstance.prototype.unmount = function () {
        this._container.removeChild(this._node);
        this._container = null;
        this._node = null;
        this._index = null;
    };
    return TextInstance;
}());
exports.TextInstance = TextInstance;
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
var DOMInstance = (function () {
    function DOMInstance(element) {
        this._index = 0;
        this._element = element;
    }
    Object.defineProperty(DOMInstance.prototype, "key", {
        get: function () {
            return this._element.key != null
                ? '_key_' + this._element.key
                : '_index_' + this._index;
        },
        enumerable: true,
        configurable: true
    });
    DOMInstance.prototype.mount = function (container) {
        var _this = this;
        this._childInstances = [];
        this._container = container;
        this._node = document.createElement(this._element.type);
        if (this._element.key != null) {
            this._node.setAttribute('key', this._element.key);
        }
        if (typeof this._element.ref === 'function') {
            this._element.ref(this._node);
        }
        setProps(this._node, this._element.props);
        this._element.props.children.forEach(function (child, index) {
            var instance = renderer_1.instantiate(child);
            instance._index = index;
            _this._childInstances.push(instance);
            var childNode = instance.mount(_this._node);
            _this._node.appendChild(childNode);
        });
        return this._node;
    };
    DOMInstance.prototype.shouldReceive = function (nextElement) {
        return typeof nextElement === 'object'
            && nextElement.type === this._element.type
            && nextElement.key === this._element.key;
    };
    DOMInstance.prototype.update = function (nextElement) {
        nextElement = nextElement == null ? this._element : nextElement;
        setProps(this._node, nextElement.props, this._element.props);
        var prevChildInstances = this._childInstances;
        var nextChildren = nextElement.props.children;
        if (prevChildInstances.length === 1
            && nextChildren.length === 1
            && prevChildInstances[0].shouldReceive(nextChildren[0])) {
            prevChildInstances[0].update(nextChildren[0]);
        }
        else {
            var patches = diff_1.diff(prevChildInstances, nextChildren);
            diff_1.patch(this._node, patches);
        }
        if (typeof nextElement.ref === 'function') {
            nextElement.ref(this._node);
        }
        this._element = nextElement;
    };
    DOMInstance.prototype.unmount = function () {
        this._container.removeChild(this._node);
        this._container = null;
        this._node = null;
        this._index = null;
        this._childInstances = [];
    };
    return DOMInstance;
}());
exports.DOMInstance = DOMInstance;
var ComponentInstance = (function () {
    function ComponentInstance(element) {
        this._index = 0;
        this._element = element;
    }
    Object.defineProperty(ComponentInstance.prototype, "key", {
        get: function () {
            return this._element.key != null
                ? '_key_' + this._element.key
                : '_index_' + this._index;
        },
        enumerable: true,
        configurable: true
    });
    ComponentInstance.prototype.mount = function (container) {
        this._container = container;
        var type = this._element.type;
        var ComponentConstructor = type;
        this._component = new ComponentConstructor(this._element.props);
        this._component.componentWillMount();
        this._component.update = this.update.bind(this);
        var renderedElement = this._component.render();
        this._renderedInstance = renderer_1.instantiate(renderedElement);
        this._node = this._renderedInstance.mount(this._container);
        if (typeof this._element.ref === 'function') {
            this._element.ref(this._node);
        }
        this._component.componentDidMount();
        return this._node;
    };
    ComponentInstance.prototype.shouldReceive = function (nextElement) {
        return typeof nextElement === 'object'
            && nextElement.type === this._element.type
            && nextElement.key === this._element.key;
    };
    ComponentInstance.prototype.update = function (nextElement, nextState) {
        if (nextState === void 0) { nextState = this._component.state; }
        nextElement = nextElement == null ? this._element : nextElement;
        this._component.props = nextElement.props;
        this._component.state = nextState;
        if (this._component.shouldComponentUpdate(nextElement.props, nextState)) {
            this._component.componentWillUpdate(nextElement.props, nextState);
            var nextRenderedElement = this._component.render();
            this._renderedInstance.update(nextRenderedElement);
            this._component.componentDidUpdate();
            if (typeof nextElement.ref === 'function') {
                nextElement.ref(this._node);
            }
        }
        this._element = nextElement;
    };
    ComponentInstance.prototype.unmount = function () {
        this._component.componentWillUnmount();
        this._container.removeChild(this._node);
        this._container = null;
        this._node = null;
        this._index = null;
        this._component = null;
        this._renderedInstance = null;
    };
    return ComponentInstance;
}());
exports.ComponentInstance = ComponentInstance;
//# sourceMappingURL=instance.js.map