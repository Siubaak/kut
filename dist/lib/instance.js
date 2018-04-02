"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = require("./renderer");
var diff_1 = require("./diff");
var constant_1 = require("./constant");
var event_1 = require("./event");
var util_1 = require("./util");
var TextInstance = (function () {
    function TextInstance(element) {
        this.index = 0;
        this._element = '' + element;
    }
    Object.defineProperty(TextInstance.prototype, "key", {
        get: function () {
            return '' + this.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextInstance.prototype, "node", {
        get: function () {
            return util_1.getNode(this.kutId);
        },
        enumerable: true,
        configurable: true
    });
    TextInstance.prototype.mount = function (kutId) {
        this.kutId = kutId;
        return "<span " + constant_1.KUT_ID + "=\"" + kutId + "\" >" + this._element + "</span>";
    };
    TextInstance.prototype.shouldReceive = function (nextElement) {
        return (typeof nextElement === 'number' || typeof nextElement === 'string');
    };
    TextInstance.prototype.update = function (nextElement) {
        nextElement = nextElement == null ? this._element : '' + nextElement;
        if (this._element !== nextElement) {
            this._element = nextElement;
            this.node.innerText = this._element;
        }
    };
    TextInstance.prototype.unmount = function () {
        event_1.removeAllEventListener(this.kutId);
        util_1.getNode(this.kutId).remove();
        delete this.kutId;
        delete this.index;
        delete this._element;
    };
    return TextInstance;
}());
exports.TextInstance = TextInstance;
var DOMInstance = (function () {
    function DOMInstance(element) {
        this.index = 0;
        this._element = element;
    }
    Object.defineProperty(DOMInstance.prototype, "key", {
        get: function () {
            return this._element.key != null
                ? 'k_' + this._element.key
                : '' + this.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DOMInstance.prototype, "node", {
        get: function () {
            return util_1.getNode(this.kutId);
        },
        enumerable: true,
        configurable: true
    });
    DOMInstance.prototype.mount = function (kutId) {
        var _this = this;
        this.kutId = kutId;
        var markup = "<" + this._element.type + " " + constant_1.KUT_ID + "=\"" + kutId + "\" ";
        if (this._element.key != null) {
            markup += "key=\"" + this._element.key + "\" ";
        }
        var props = this._element.props;
        for (var prop in props) {
            if (prop === 'children') {
            }
            else if (prop === 'className') {
                markup += "class=\"" + util_1.getClassString(props.className) + "\" ";
            }
            else if (prop === 'style') {
                markup += "style=\"" + util_1.getStyleString(props.style) + "\" ";
            }
            else if (constant_1.KUT_SUPPORTED_EVENT_HANDLERS[prop.toLowerCase()]
                && typeof props[prop] === 'function') {
                event_1.setEventListener(kutId, prop.toLowerCase().replace(constant_1.CUT_ON_REGEX, ''), props[prop]);
            }
            else {
                markup += prop + "=\"" + props[prop] + "\" ";
            }
        }
        markup += '>';
        this._childInstances = [];
        this._element.props.children.forEach(function (child, index) {
            var instance = renderer_1.instantiate(child);
            instance.index = index;
            markup += instance.mount(kutId + ":" + instance.key);
            _this._childInstances.push(instance);
        });
        markup += "</" + this._element.type + ">";
        return markup;
    };
    DOMInstance.prototype.shouldReceive = function (nextElement) {
        return typeof nextElement === 'object'
            && nextElement.type === this._element.type
            && nextElement.key === this._element.key;
    };
    DOMInstance.prototype.update = function (nextElement) {
        nextElement = nextElement == null ? this._element : nextElement;
        var node = util_1.getNode(this.kutId);
        var prevProps = this._element.props;
        var nextProps = nextElement.props;
        for (var prop in nextProps) {
            if (prop === 'children') {
                continue;
            }
            else if (prop === 'className') {
                node.className = util_1.getClassString(nextProps.className);
            }
            else if (prop === 'style') {
                node.style.cssText = util_1.getStyleString(nextProps.style);
            }
            else if (prop === 'value') {
                ;
                node.value = nextProps.value;
            }
            else if (constant_1.KUT_SUPPORTED_EVENT_HANDLERS[prop.toLowerCase()]
                && typeof nextProps[prop] === 'function') {
                event_1.setEventListener(this.kutId, prop.toLowerCase().replace(constant_1.CUT_ON_REGEX, ''), nextProps[prop]);
            }
            else {
                node.setAttribute(prop, nextProps[prop]);
            }
        }
        for (var prop in prevProps) {
            if (nextProps[prop] == null) {
                if (constant_1.KUT_SUPPORTED_EVENT_HANDLERS[prop.toLowerCase()]
                    && typeof nextProps[prop] === 'function') {
                    event_1.removeEventListener(this.kutId, prop.toLowerCase().replace(constant_1.CUT_ON_REGEX, ''));
                }
                else {
                    node.removeAttribute(prop);
                }
            }
        }
        var prevChildInstances = this._childInstances;
        var nextChildren = nextElement.props.children;
        if (prevChildInstances.length === 1
            && nextChildren.length === 1
            && prevChildInstances[0].shouldReceive(nextChildren[0])) {
            prevChildInstances[0].update(nextChildren[0]);
        }
        else {
            var patches = diff_1.diff(prevChildInstances, nextChildren);
            diff_1.patch(this.kutId, patches);
        }
        this._element = nextElement;
    };
    DOMInstance.prototype.unmount = function () {
        event_1.removeAllEventListener(this.kutId);
        this._childInstances.forEach(function (child) { return child.unmount(); });
        util_1.getNode(this.kutId).remove();
        delete this.kutId;
        delete this.index;
        delete this._element;
        delete this._childInstances;
    };
    return DOMInstance;
}());
exports.DOMInstance = DOMInstance;
var ComponentInstance = (function () {
    function ComponentInstance(element) {
        this.index = 0;
        this._element = element;
    }
    Object.defineProperty(ComponentInstance.prototype, "key", {
        get: function () {
            return this._element.key != null
                ? 'k_' + this._element.key
                : '' + this.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentInstance.prototype, "node", {
        get: function () {
            return util_1.getNode(this.kutId);
        },
        enumerable: true,
        configurable: true
    });
    ComponentInstance.prototype.mount = function (kutId) {
        this.kutId = kutId;
        var type = this._element.type;
        var ComponentConstructor = type;
        this._component = new ComponentConstructor(this._element.props);
        this._component.componentWillMount();
        this._component.update = this.update.bind(this);
        var renderedElement = this._component.render();
        this._renderedInstance = renderer_1.instantiate(renderedElement);
        var markup = this._renderedInstance.mount(kutId);
        util_1.didMountSet.add(this._component.componentDidMount.bind(this._component));
        return markup;
    };
    ComponentInstance.prototype.shouldReceive = function (nextElement) {
        return typeof nextElement === 'object'
            && nextElement.type === this._element.type
            && nextElement.key === this._element.key;
    };
    ComponentInstance.prototype.update = function (nextElement, nextState) {
        if (nextState === void 0) { nextState = this._component.state; }
        nextElement = nextElement == null ? this._element : nextElement;
        if (this._element !== nextElement) {
            this._component.componentWillReceiveProps(nextElement.props);
        }
        this._component.props = nextElement.props;
        this._component.state = nextState;
        if (this._component.shouldComponentUpdate(nextElement.props, nextState)) {
            this._component.componentWillUpdate(nextElement.props, nextState);
            var nextRenderedElement = this._component.render();
            this._renderedInstance.update(nextRenderedElement);
            this._component.componentDidUpdate();
        }
        this._element = nextElement;
    };
    ComponentInstance.prototype.unmount = function () {
        this._component.componentWillUnmount();
        event_1.removeAllEventListener(this.kutId);
        this._renderedInstance.unmount();
        util_1.getNode(this.kutId).remove();
        delete this.kutId;
        delete this.index;
        delete this._element;
        delete this._component;
        delete this._renderedInstance;
    };
    return ComponentInstance;
}());
exports.ComponentInstance = ComponentInstance;
//# sourceMappingURL=instance.js.map