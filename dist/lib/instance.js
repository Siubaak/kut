"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = require("./renderer");
var diff_1 = require("./diff");
var constant_1 = require("./constant");
var event_1 = require("./event");
var util_1 = require("./util");
var reconciler_1 = require("./reconciler");
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
        event_1.eventListenerSet.delAll(this.kutId);
        this.node.remove();
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
                continue;
            }
            else if (prop === 'className') {
                markup += "class=\"" + util_1.getClassString(props.className) + "\" ";
            }
            else if (prop === 'style') {
                markup += "style=\"" + util_1.getStyleString(props.style) + "\" ";
            }
            else if (constant_1.KUT_SUPPORTED_EVENT_HANDLERS[prop.toLowerCase()]
                && typeof props[prop] === 'function') {
                event_1.eventListenerSet.set(kutId, prop.toLowerCase().replace(constant_1.CUT_ON_REGEX, ''), props[prop]);
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
        if (typeof this._element.ref === 'function') {
            util_1.didMountSet.add(function () { return _this._element.ref(_this.node); });
        }
        return markup;
    };
    DOMInstance.prototype.shouldReceive = function (nextElement) {
        return typeof nextElement === 'object'
            && nextElement.type === this._element.type
            && nextElement.key === this._element.key;
    };
    DOMInstance.prototype.update = function (nextElement) {
        nextElement = nextElement == null ? this._element : nextElement;
        var node = this.node;
        var prevProps = this._element.props;
        var nextProps = nextElement.props;
        for (var prop in nextProps) {
            if (prop === 'children') {
                continue;
            }
            else if (prop === 'className') {
                var nextClassName = util_1.getClassString(nextProps.className);
                if (node.className !== nextClassName) {
                    node.className = nextClassName;
                }
            }
            else if (prop === 'style') {
                var nextStyle = util_1.getStyleString(nextProps.style);
                if (node.style.cssText !== nextStyle) {
                    node.style.cssText = nextStyle;
                }
            }
            else if (prop === 'value') {
                var nextValue = nextProps.value;
                if (node.value !== nextValue) {
                    ;
                    node.value = nextValue;
                }
            }
            else if (constant_1.KUT_SUPPORTED_EVENT_HANDLERS[prop.toLowerCase()]
                && typeof nextProps[prop] === 'function') {
                var event_2 = prop.toLowerCase().replace(constant_1.CUT_ON_REGEX, '');
                var prevEventListener = event_1.eventListenerSet.get(this.kutId, event_2);
                var nextEventListener = nextProps[prop];
                if (prevEventListener !== nextEventListener) {
                    event_1.eventListenerSet.set(this.kutId, event_2, nextEventListener);
                }
            }
            else {
                var nextAttr = nextProps[prop];
                if (node.getAttribute(prop) !== nextAttr) {
                    node.setAttribute(prop, nextAttr);
                }
            }
        }
        for (var prop in prevProps) {
            if (nextProps[prop] == null) {
                if (constant_1.KUT_SUPPORTED_EVENT_HANDLERS[prop.toLowerCase()]
                    && typeof nextProps[prop] === 'function') {
                    event_1.eventListenerSet.del(this.kutId, prop.toLowerCase().replace(constant_1.CUT_ON_REGEX, ''));
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
            reconciler_1.reconciler.enqueueUpdate(prevChildInstances[0], nextChildren[0]);
        }
        else {
            var patches = diff_1.diff(prevChildInstances, nextChildren);
            diff_1.patch(this.kutId, patches);
        }
        this._element = nextElement;
    };
    DOMInstance.prototype.unmount = function () {
        event_1.eventListenerSet.delAll(this.kutId);
        this._childInstances.forEach(function (child) { return child.unmount(); });
        this.node.remove();
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
        this._skipShouldUpdate = false;
        this._stateQueue = [];
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
        var _this = this;
        this.kutId = kutId;
        var ComponentSubclass = this._element.type;
        this._component = new ComponentSubclass(this._element.props);
        this._component._updater = {
            enqueueSetState: function (partialState, callback) {
                _this._stateQueue.push({ partialState: partialState, callback: callback });
                reconciler_1.reconciler.enqueueUpdate(_this);
            },
            enqueueForceUpdate: function (callback) {
                _this._skipShouldUpdate = true;
                _this._stateQueue.push({ partialState: null, callback: callback });
                reconciler_1.reconciler.enqueueUpdate(_this);
            },
        };
        if (typeof ComponentSubclass.getDerivedStateFromProps === 'function') {
            this._component.state = Object.assign({}, this._component.state, ComponentSubclass.getDerivedStateFromProps(this._element.props, this._component.state));
        }
        var renderedElement = this._component.render();
        this._renderedInstance = renderer_1.instantiate(renderedElement);
        var markup = this._renderedInstance.mount(kutId);
        if (typeof this._component.componentDidMount === 'function') {
            util_1.didMountSet.add(this._component.componentDidMount.bind(this._component));
        }
        return markup;
    };
    ComponentInstance.prototype.shouldReceive = function (nextElement) {
        return typeof nextElement === 'object'
            && nextElement.type === this._element.type
            && nextElement.key === this._element.key;
    };
    ComponentInstance.prototype.update = function (nextElement) {
        var _this = this;
        nextElement = nextElement == null ? this._element : nextElement;
        var prevProps = this._component.props;
        var prevState = this._component.state;
        if (this._element !== nextElement) {
            var ComponentSubclass = this._element.type;
            if (typeof ComponentSubclass.getDerivedStateFromProps === 'function') {
                this._component.state = Object.assign({}, this._component.state, ComponentSubclass.getDerivedStateFromProps(nextElement.props, prevState));
            }
        }
        while (this._stateQueue.length) {
            var state = this._stateQueue.shift();
            var partialState = state.partialState, callback = state.callback;
            if (typeof partialState === 'function') {
                partialState = partialState(this._component.state);
            }
            if (typeof partialState === 'object') {
                this._component.state = Object.assign({}, this._component.state, partialState);
                if (typeof callback === 'function') {
                    callback(this._component.state);
                }
            }
        }
        var nextProps = this._component.props = nextElement.props;
        var nextState = this._component.state;
        var shouldUpdate = true;
        if (typeof this._component.shouldComponentUpdate === 'function'
            && !this._skipShouldUpdate) {
            shouldUpdate = this._component.shouldComponentUpdate(nextProps, nextState);
        }
        if (shouldUpdate) {
            this._skipShouldUpdate = false;
            var snapshot_1;
            if (typeof this._component.getSnapshotBeforeUpdate === 'function') {
                snapshot_1 = this._component.getSnapshotBeforeUpdate(prevProps, prevState);
            }
            var nextRenderedElement = this._component.render();
            var didUpdate = void 0;
            if (typeof this._component.componentDidUpdate === 'function') {
                didUpdate = function () { return _this._component.componentDidUpdate(prevProps, prevState, snapshot_1); };
            }
            reconciler_1.reconciler.enqueueUpdate(this._renderedInstance, nextRenderedElement, didUpdate);
        }
        this._element = nextElement;
    };
    ComponentInstance.prototype.unmount = function () {
        if (typeof this._component.componentWillUnmount === 'function') {
            this._component.componentWillUnmount();
        }
        event_1.eventListenerSet.delAll(this.kutId);
        this._renderedInstance.unmount();
        this.node.remove();
        delete this.kutId;
        delete this.index;
        delete this._element;
        delete this._component;
        delete this._renderedInstance;
        delete this._skipShouldUpdate;
    };
    return ComponentInstance;
}());
exports.ComponentInstance = ComponentInstance;
//# sourceMappingURL=instance.js.map