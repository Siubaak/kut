"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = require("./renderer");
var utils_1 = require("./utils");
var TextInstance = (function () {
    function TextInstance(element) {
        this._element = element;
    }
    TextInstance.prototype.mount = function (container) {
        this._container = container;
        this._node = document.createTextNode(this._element);
        return this._node;
    };
    TextInstance.prototype.update = function (nextElement) {
        nextElement = nextElement || this._element;
        if (nextElement === this._element) {
            return;
        }
        else {
            var prevNode = this._node;
            this._element = nextElement;
            this._node = document.createTextNode(nextElement);
            this._container.replaceChild(this._node, prevNode);
        }
    };
    TextInstance.prototype.unmount = function () {
        this._container.removeChild(this._node);
        this._element = null;
        this._container = null;
        this._node = null;
    };
    return TextInstance;
}());
exports.TextInstance = TextInstance;
var DOMInstance = (function () {
    function DOMInstance(element) {
        this._element = element;
    }
    DOMInstance.prototype.mount = function (container) {
        var _this = this;
        this._childInstances = [];
        this._container = container;
        this._node = document.createElement(this._element.type);
        if (this._element.key) {
            this._node.setAttribute('key', this._element.key);
        }
        utils_1.setProps(this._node, this._element.props);
        this._element.props.children.forEach(function (child) {
            var instance = renderer_1.instantiate(child);
            _this._childInstances.push(instance);
            var childNode = instance.mount(_this._node);
            _this._node.appendChild(childNode);
        });
        return this._node;
    };
    DOMInstance.prototype.update = function (nextElement) {
        var _this = this;
        nextElement = nextElement || this._element;
        if (nextElement.type === this._element.type
            && nextElement.key === this._element.key) {
            utils_1.setProps(this._node, nextElement.props, this._element.props);
            while (nextElement.props.children.length < this._childInstances.length) {
                this._childInstances[this._childInstances.length - 1].unmount();
                this._childInstances.pop();
            }
            nextElement.props.children.forEach(function (child, index) {
                if (_this._childInstances[index]) {
                    _this._childInstances[index].update(child);
                }
                else {
                    var instance = renderer_1.instantiate(child);
                    _this._childInstances.push(instance);
                    var childNode = instance.mount(_this._node);
                    _this._node.appendChild(childNode);
                }
            });
        }
        else {
            this._element = nextElement;
            var prevNode = this._node;
            this._node = this.mount(this._container);
            this._container.replaceChild(this._node, prevNode);
        }
    };
    DOMInstance.prototype.unmount = function () {
        this._container.removeChild(this._node);
        this._element = null;
        this._container = null;
        this._node = null;
    };
    return DOMInstance;
}());
exports.DOMInstance = DOMInstance;
var ComponentInstance = (function () {
    function ComponentInstance(element) {
        this._element = element;
    }
    ComponentInstance.prototype.mount = function (container) {
        this._container = container;
        var type = this._element.type;
        var ComponentConstructor = type;
        this._component = new ComponentConstructor(this._element.props);
        this._component.componentWillMount();
        this._component._instance = this;
        var renderedElement = this._component.render();
        this._renderedInstance = renderer_1.instantiate(renderedElement);
        this._node = this._renderedInstance.mount(this._container);
        this._component.componentDidMount();
        return this._node;
    };
    ComponentInstance.prototype.update = function (nextElement, nextState) {
        if (nextState === void 0) { nextState = this._component.state; }
        nextElement = nextElement || this._element;
        this._component.props = nextElement.props;
        this._component.state = nextState;
        if (this._component.shouldComponentUpdate(nextElement.props, nextState)) {
            this._component.componentWillUpdate(nextElement.props, nextState);
            var nextRenderedElement = this._component.render();
            if (nextElement.type === this._element.type
                && nextElement.key === this._element.key) {
                this._renderedInstance.update(nextRenderedElement);
                this._component.componentDidUpdate();
            }
            else {
                var prevNode = this._node;
                this._renderedInstance = renderer_1.instantiate(nextRenderedElement);
                this._node = this._renderedInstance.mount(this._container);
                this._container.replaceChild(this._node, prevNode);
            }
        }
        this._element = nextElement;
    };
    ComponentInstance.prototype.unmount = function () {
        this._container.removeChild(this._node);
        this._element = null;
        this._container = null;
        this._node = null;
        this._component = null;
        this._renderedInstance = null;
    };
    return ComponentInstance;
}());
exports.ComponentInstance = ComponentInstance;
//# sourceMappingURL=instance.js.map