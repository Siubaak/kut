// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({26:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.KUT_ID = 'data-kutid';
exports.KUT_RESERVED_PROPS = {
    key: true
};
exports.CUT_ON_REGEX = /^on/;
var eventHandlers = Object.keys(window || {}).filter(function (key) {
    return exports.CUT_ON_REGEX.test(key);
});
exports.KUT_SUPPORTED_EVENTS = eventHandlers.map(function (key) {
    return key.replace(exports.CUT_ON_REGEX, '');
});
exports.KUT_SUPPORTED_EVENT_HANDLERS = {};
eventHandlers.forEach(function (eventHandler) {
    exports.KUT_SUPPORTED_EVENT_HANDLERS[eventHandler] = true;
});
//# sourceMappingURL=constant.js.map
},{}],22:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("./constant");
function createElement(type, config) {
    var rawChildren = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rawChildren[_i - 2] = arguments[_i];
    }
    var children = rawChildren.length ? [].concat.apply([], rawChildren) : [''];
    var props = { children: children };
    var key = null;
    if (config) {
        if (config.key != null) {
            key = ('' + config.key).replace(/:/g, '_');
        }
        for (var prop in config) {
            if (Object.hasOwnProperty.call(config, prop) && !constant_1.KUT_RESERVED_PROPS[prop]) {
                props[prop] = config[prop];
            }
        }
    }
    return { type: type, key: key, props: props };
}
exports.createElement = createElement;
//# sourceMappingURL=element.js.map
},{"./constant":26}],23:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Component = function () {
    function Component(props) {
        this.state = {};
        this.props = props;
        this.update = function (nextElement, nextState) {};
    }
    Component.prototype.setState = function (state) {
        this.state = Object.assign({}, this.state, state);
        this.update(null, this.state);
    };
    Component.prototype.forceUpdate = function () {
        this.update(null, this.state);
    };
    Component.prototype.render = function (props) {
        if (props === void 0) {
            props = this.props;
        }
        return null;
    };
    Component.prototype.componentWillMount = function () {};
    Component.prototype.componentDidMount = function () {};
    Component.prototype.componentWillReceiveProps = function (nextProps) {};
    Component.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return true;
    };
    Component.prototype.componentWillUpdate = function (nextProps, nextState) {};
    Component.prototype.componentDidUpdate = function () {};
    Component.prototype.componentWillUnmount = function () {};
    return Component;
}();
exports.Component = Component;
//# sourceMappingURL=component.js.map
},{}],33:[function(require,module,exports) {
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("./constant");
function getParentID(childID) {
    var regex = /[:]\w+$/;
    return regex.test(childID) && childID.replace(regex, '');
}
exports.getParentID = getParentID;
function getNode(kutId) {
    return document.querySelector("[" + constant_1.KUT_ID + "=\"" + kutId + "\"]");
}
exports.getNode = getNode;
function createNode(markup) {
    if (markup === '') {
        return document.createTextNode('');
    } else {
        var node = document.createElement('div');
        node.innerHTML = markup;
        return node.firstChild;
    }
}
exports.createNode = createNode;
function getClassString(className) {
    var markup = '';
    if (className == null) {} else if ((typeof className === "undefined" ? "undefined" : _typeof(className)) === 'object') {
        markup += Object.keys(className).filter(function (cls) {
            return className[cls];
        }).join(' ');
    } else if (Array.isArray(className)) {
        markup += className.join(' ');
    } else {
        markup += className.toString();
    }
    return markup.trim();
}
exports.getClassString = getClassString;
function getStyleString(style) {
    var markup = '';
    if (style == null) {} else if ((typeof style === "undefined" ? "undefined" : _typeof(style)) === 'object') {
        for (var key in style) {
            if (Object.hasOwnProperty.call(style, key)) {
                markup += key.replace(/[A-Z]/g, function (letter) {
                    return "-" + letter.toLowerCase();
                }) + (": " + style[key] + "; ");
            }
        }
    } else {
        markup += style.toString();
    }
    return markup.trim();
}
exports.getStyleString = getStyleString;
//# sourceMappingURL=util.js.map
},{"./constant":26}],31:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = require("./renderer");
var util_1 = require("./util");
function diff(prevInstances, nextChildren) {
    var prevInstanceMap = {};
    prevInstances.forEach(function (inst, index) {
        return prevInstanceMap[inst.key] = inst;
    });
    var nextInstances = [];
    nextChildren.forEach(function (nextChild, index) {
        var key = nextChild.key != null ? 'k_' + nextChild.key : '' + index;
        var prevInstance = prevInstanceMap[key];
        if (prevInstance && prevInstance.shouldReceive(nextChild)) {
            prevInstance.update(nextChild);
            nextInstances.push(prevInstance);
        } else {
            var nextInstance = renderer_1.instantiate(nextChild);
            nextInstance.index = index;
            nextInstances.push(nextInstance);
        }
    });
    var forwardOps = [];
    var backwardOps = [];
    var lastForwardIndex = -1;
    var lastBackwardIndex = prevInstances.length;
    for (var index = 0; index < nextInstances.length; ++index) {
        var forwardNextInstance = nextInstances[index];
        var forwardPrevInstance = prevInstanceMap[forwardNextInstance.key];
        if (forwardPrevInstance === forwardNextInstance) {
            if (forwardPrevInstance.index < lastForwardIndex) {
                forwardOps.push({
                    type: 'move',
                    index: lastForwardIndex,
                    inst: forwardPrevInstance
                });
            }
            lastForwardIndex = Math.max(forwardPrevInstance.index, lastForwardIndex);
        } else {
            if (forwardPrevInstance) {
                forwardOps.push({
                    type: 'remove',
                    index: -1,
                    inst: forwardPrevInstance
                });
            }
            forwardOps.push({
                type: 'insert',
                index: lastForwardIndex,
                inst: forwardNextInstance
            });
        }
        var backwardNextInstance = nextInstances[nextInstances.length - index - 1];
        var backwardPrevInstance = prevInstanceMap[backwardNextInstance.key];
        if (backwardPrevInstance === backwardNextInstance) {
            if (backwardPrevInstance.index > lastBackwardIndex) {
                backwardOps.push({
                    type: 'move',
                    index: lastBackwardIndex,
                    inst: backwardPrevInstance
                });
            }
            lastBackwardIndex = Math.min(backwardPrevInstance.index, lastBackwardIndex);
        } else {
            if (backwardPrevInstance) {
                backwardOps.push({
                    type: 'remove',
                    index: -1,
                    inst: backwardPrevInstance
                });
            }
            backwardOps.push({
                type: 'insert',
                index: lastBackwardIndex,
                inst: backwardNextInstance
            });
        }
    }
    var nextInstanceMap = {};
    nextInstances.forEach(function (inst, index) {
        return nextInstanceMap[inst.key] = inst;
    });
    for (var key in prevInstanceMap) {
        if (!nextInstanceMap[key]) {
            forwardOps.push({
                type: 'remove',
                index: -1,
                inst: prevInstanceMap[key]
            });
            backwardOps.push({
                type: 'remove',
                index: -1,
                inst: prevInstanceMap[key]
            });
        }
    }
    nextInstances.forEach(function (nextInstance, index) {
        return nextInstance.index = index;
    });
    prevInstances.length = 0;
    prevInstances.push.apply(prevInstances, nextInstances);
    return forwardOps.length < backwardOps.length ? { ops: forwardOps, dir: 'forward' } : { ops: backwardOps, dir: 'backward' };
}
exports.diff = diff;
function patch(parentId, patches) {
    var container = util_1.getNode(parentId);
    var ops = patches.ops,
        dir = patches.dir;
    var insertNum = 0;
    ops.forEach(function (op) {
        var beforeIndex = dir === 'forward' ? op.index + 1 + insertNum : op.index;
        switch (op.type) {
            case 'insert':
                {
                    var beforeNode = container.children[beforeIndex];
                    var markup = op.inst.mount(parentId + ":" + op.inst.key);
                    var node = util_1.createNode(markup);
                    if (beforeNode !== undefined) {
                        container.insertBefore(node, beforeNode);
                    } else {
                        container.appendChild(node);
                    }
                    ++insertNum;
                    break;
                }
            case 'move':
                {
                    var beforeNode = container.children[beforeIndex];
                    if (beforeNode !== undefined) {
                        container.insertBefore(op.inst.node, beforeNode);
                    } else {
                        container.appendChild(op.inst.node);
                    }
                    break;
                }
            default:
                {
                    op.inst.unmount();
                }
        }
    });
}
exports.patch = patch;
//# sourceMappingURL=diff.js.map
},{"./renderer":24,"./util":33}],32:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("./constant");
var util_1 = require("./util");
var eventHanlders = {};
if (document) {
    constant_1.KUT_SUPPORTED_EVENTS.forEach(function (event) {
        document.addEventListener(event, function (e) {
            var kutId = e.target.getAttribute && e.target.getAttribute(constant_1.KUT_ID);
            while (kutId) {
                var eventHanlder = eventHanlders[kutId] && eventHanlders[kutId][event];
                if (eventHanlder) {
                    eventHanlder(e);
                }
                kutId = util_1.getParentID(kutId);
            }
        });
    });
}
function setEventListener(kutId, event, eventHanlder) {
    if (!eventHanlders[kutId]) {
        eventHanlders[kutId] = {};
    }
    eventHanlders[kutId][event] = eventHanlder;
}
exports.setEventListener = setEventListener;
function removeEventListener(kutId, event) {
    if (eventHanlders[kutId]) {
        delete eventHanlders[kutId][event];
    }
}
exports.removeEventListener = removeEventListener;
function removeAllEventListener(kutId) {
    delete eventHanlders[kutId];
}
exports.removeAllEventListener = removeAllEventListener;
//# sourceMappingURL=event.js.map
},{"./constant":26,"./util":33}],27:[function(require,module,exports) {
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = require("./renderer");
var diff_1 = require("./diff");
var constant_1 = require("./constant");
var event_1 = require("./event");
var util_1 = require("./util");
var TextInstance = function () {
    function TextInstance(element) {
        this.index = 0;
        this._element = '' + element;
    }
    Object.defineProperty(TextInstance.prototype, "key", {
        get: function get() {
            return '' + this.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextInstance.prototype, "node", {
        get: function get() {
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
        return typeof nextElement === 'number' || typeof nextElement === 'string';
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
}();
exports.TextInstance = TextInstance;
var DOMInstance = function () {
    function DOMInstance(element) {
        this.index = 0;
        this._element = element;
    }
    Object.defineProperty(DOMInstance.prototype, "key", {
        get: function get() {
            return this._element.key != null ? 'k_' + this._element.key : '' + this.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DOMInstance.prototype, "node", {
        get: function get() {
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
            if (prop === 'children') {} else if (prop === 'className') {
                markup += "class=\"" + util_1.getClassString(props.className) + "\" ";
            } else if (prop === 'style') {
                markup += "style=\"" + util_1.getStyleString(props.style) + "\" ";
            } else if (constant_1.KUT_SUPPORTED_EVENT_HANDLERS[prop.toLowerCase()] && typeof props[prop] === 'function') {
                event_1.setEventListener(kutId, prop.toLowerCase().replace(constant_1.CUT_ON_REGEX, ''), props[prop]);
            } else {
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
        return (typeof nextElement === "undefined" ? "undefined" : _typeof(nextElement)) === 'object' && nextElement.type === this._element.type && nextElement.key === this._element.key;
    };
    DOMInstance.prototype.update = function (nextElement) {
        nextElement = nextElement == null ? this._element : nextElement;
        var node = util_1.getNode(this.kutId);
        var prevProps = this._element.props;
        var nextProps = nextElement.props;
        for (var prop in nextProps) {
            if (prop === 'children') {
                continue;
            } else if (prop === 'className') {
                node.className = util_1.getClassString(nextProps.className);
            } else if (prop === 'style') {
                node.style.cssText = util_1.getStyleString(nextProps.style);
            } else if (prop === 'value') {
                node.value = nextProps.value;
            } else if (constant_1.KUT_SUPPORTED_EVENT_HANDLERS[prop.toLowerCase()] && typeof nextProps[prop] === 'function') {
                event_1.setEventListener(this.kutId, prop.toLowerCase().replace(constant_1.CUT_ON_REGEX, ''), nextProps[prop]);
            } else {
                node.setAttribute(prop, nextProps[prop]);
            }
        }
        for (var prop in prevProps) {
            if (nextProps[prop] == null) {
                if (constant_1.KUT_SUPPORTED_EVENT_HANDLERS[prop.toLowerCase()] && typeof nextProps[prop] === 'function') {
                    event_1.removeEventListener(this.kutId, prop.toLowerCase().replace(constant_1.CUT_ON_REGEX, ''));
                } else {
                    node.removeAttribute(prop);
                }
            }
        }
        var prevChildInstances = this._childInstances;
        var nextChildren = nextElement.props.children;
        if (prevChildInstances.length === 1 && nextChildren.length === 1 && prevChildInstances[0].shouldReceive(nextChildren[0])) {
            prevChildInstances[0].update(nextChildren[0]);
        } else {
            var patches = diff_1.diff(prevChildInstances, nextChildren);
            diff_1.patch(this.kutId, patches);
        }
        this._element = nextElement;
    };
    DOMInstance.prototype.unmount = function () {
        event_1.removeAllEventListener(this.kutId);
        this._childInstances.forEach(function (child) {
            return child.unmount();
        });
        util_1.getNode(this.kutId).remove();
        delete this.kutId;
        delete this.index;
        delete this._element;
        delete this._childInstances;
    };
    return DOMInstance;
}();
exports.DOMInstance = DOMInstance;
var ComponentInstance = function () {
    function ComponentInstance(element) {
        this.index = 0;
        this._element = element;
    }
    Object.defineProperty(ComponentInstance.prototype, "key", {
        get: function get() {
            return this._element.key != null ? 'k_' + this._element.key : '' + this.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentInstance.prototype, "node", {
        get: function get() {
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
        this._component.componentDidMount();
        return markup;
    };
    ComponentInstance.prototype.shouldReceive = function (nextElement) {
        return (typeof nextElement === "undefined" ? "undefined" : _typeof(nextElement)) === 'object' && nextElement.type === this._element.type && nextElement.key === this._element.key;
    };
    ComponentInstance.prototype.update = function (nextElement, nextState) {
        if (nextState === void 0) {
            nextState = this._component.state;
        }
        nextElement = nextElement == null ? this._element : nextElement;
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
}();
exports.ComponentInstance = ComponentInstance;
//# sourceMappingURL=instance.js.map
},{"./renderer":24,"./diff":31,"./constant":26,"./event":32,"./util":33}],24:[function(require,module,exports) {
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("./component");
var instance_1 = require("./instance");
function instantiate(element) {
    var instance = null;
    if (typeof element === 'number' || typeof element === 'string') {
        instance = new instance_1.TextInstance(element);
    } else if (typeof element.type === 'string') {
        instance = new instance_1.DOMInstance(element);
    } else if (_typeof(element.type) === _typeof(component_1.Component)) {
        instance = new instance_1.ComponentInstance(element);
    }
    return instance;
}
exports.instantiate = instantiate;
function render(element, container) {
    var instance = instantiate(element);
    var rootId = Math.random().toString(36).substring(2, 4);
    container.innerHTML = instance.mount(rootId);
}
exports.render = render;
//# sourceMappingURL=renderer.js.map
},{"./component":23,"./instance":27}],14:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var element_1 = require("./element");
var component_1 = require("./component");
var renderer_1 = require("./renderer");
var Kut = {
    createElement: element_1.createElement,
    Component: component_1.Component,
    render: renderer_1.render
};
if (window) {
    window.Kut = Kut;
}
exports.default = Kut;
//# sourceMappingURL=kut.js.map
},{"./element":22,"./component":23,"./renderer":24}],7:[function(require,module,exports) {
'use strict';

module.exports = require('./dist/lib/kut.js');
},{"./dist/lib/kut.js":14}],20:[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],12:[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":20}],28:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":12}],15:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../../../index');

var _index2 = _interopRequireDefault(_index);

require('./Banner.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Banner = function (_React$Component) {
  _inherits(Banner, _React$Component);

  function Banner(props) {
    _classCallCheck(this, Banner);

    return _possibleConstructorReturn(this, (Banner.__proto__ || Object.getPrototypeOf(Banner)).call(this, props));
  }

  _createClass(Banner, [{
    key: 'render',
    value: function render() {
      return _index2.default.createElement(
        'header',
        { className: 'Banner' },
        _index2.default.createElement(
          'h1',
          { className: 'title' },
          'Kut'
        ),
        _index2.default.createElement(
          'p',
          { className: 'desc' },
          '\u6570\u636E\u9A71\u52A8\u7684\u524D\u7AEF\u89C6\u56FE\u6E32\u67D3\u5E93'
        ),
        _index2.default.createElement(
          'div',
          { className: 'link' },
          _index2.default.createElement(
            'a',
            { href: 'https://www.npmjs.com/package/kut' },
            _index2.default.createElement('img', { src: 'https://img.shields.io/npm/v/kut.svg?style=flat-square', alt: '' })
          ),
          _index2.default.createElement(
            'a',
            { href: 'https://github.com/Siubaak/kut' },
            _index2.default.createElement('img', { src: 'https://img.shields.io/github/stars/Siubaak/kut.svg?style=flat-square&label=Stars', alt: '' })
          )
        )
      );
    }
  }]);

  return Banner;
}(_index2.default.Component);

exports.default = Banner;
},{"../../../index":7,"./Banner.less":28}],21:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":12}],16:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../../../index');

var _index2 = _interopRequireDefault(_index);

require('./Nav.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Nav = function (_React$Component) {
  _inherits(Nav, _React$Component);

  function Nav(props) {
    _classCallCheck(this, Nav);

    return _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).call(this, props));
  }

  _createClass(Nav, [{
    key: 'render',
    value: function render() {
      return _index2.default.createElement(
        'nav',
        { className: 'Nav' },
        _index2.default.createElement(
          'div',
          { className: {
              nav: true,
              fix: this.props.fix
            } },
          this.props.children
        )
      );
    }
  }]);

  return Nav;
}(_index2.default.Component);

exports.default = Nav;
},{"../../../index":7,"./Nav.less":21}],29:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":12}],17:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../../../index');

var _index2 = _interopRequireDefault(_index);

require('./Content.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Content = function (_React$Component) {
  _inherits(Content, _React$Component);

  function Content(props) {
    _classCallCheck(this, Content);

    return _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));
  }

  _createClass(Content, [{
    key: 'render',
    value: function render() {
      return _index2.default.createElement(
        'div',
        { className: 'Content' },
        _index2.default.createElement(
          'div',
          { className: {
              top: this.props.fix
            } },
          this.props.children
        )
      );
    }
  }]);

  return Content;
}(_index2.default.Component);

exports.default = Content;
},{"../../../index":7,"./Content.less":29}],25:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":12}],18:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../../../index');

var _index2 = _interopRequireDefault(_index);

require('./Demo.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var uniqueKey = 0;

var Demo = function (_React$Component) {
  _inherits(Demo, _React$Component);

  function Demo(props) {
    _classCallCheck(this, Demo);

    var _this = _possibleConstructorReturn(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).call(this, props));

    _this.state = {
      input: '',
      todos: [{ key: -1, item: '继续学习React源码' }, { key: -2, item: '笔记本要清灰了' }, { key: -3, item: '完成课程论文第二章' }, { key: -4, item: '买洗发水和沐浴露' }, { key: -5, item: '补番《紫罗兰永恒公园》' }]
    };
    return _this;
  }

  _createClass(Demo, [{
    key: 'handleInput',
    value: function handleInput(e) {
      this.setState({ input: e.target.value });
    }
  }, {
    key: 'handleAdd',
    value: function handleAdd(e) {
      if (this.state.input !== '') {
        var todo = { key: uniqueKey++, item: this.state.input };
        var todos = [].concat(_toConsumableArray(this.state.todos));
        todos.push(todo);
        this.setState({ todos: todos, input: '' });
      }
    }
  }, {
    key: 'handleRan',
    value: function handleRan(index) {
      var todos = [].concat(_toConsumableArray(this.state.todos));
      var shuffleTodos = [];
      while (todos.length) {
        var i = Math.floor(Math.random() * todos.length);
        shuffleTodos.push(todos[i]);
        todos.splice(i, 1);
      }
      this.setState({ todos: shuffleTodos });
    }
  }, {
    key: 'handleDel',
    value: function handleDel(index) {
      var todos = [].concat(_toConsumableArray(this.state.todos));
      todos.splice(index, 1);
      this.setState({ todos: todos });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _index2.default.createElement(
        'div',
        { className: 'Demo' },
        _index2.default.createElement(
          'p',
          { 'class': 'desc' },
          '\u5F85\u529E\u4E8B\u9879'
        ),
        _index2.default.createElement(
          'div',
          { 'class': 'input-box' },
          _index2.default.createElement('input', { 'class': 'input', onInput: this.handleInput.bind(this), value: this.state.input }),
          _index2.default.createElement(
            'button',
            { 'class': 'add', onClick: this.handleAdd.bind(this) },
            '\u6DFB\u52A0'
          ),
          _index2.default.createElement(
            'button',
            { 'class': 'add', onClick: this.handleRan.bind(this) },
            '\u6253\u4E71'
          )
        ),
        _index2.default.createElement(
          'ul',
          { 'class': 'list' },
          this.state.todos.length ? this.state.todos.map(function (todo, index) {
            return _index2.default.createElement(
              'li',
              { 'class': 'item', key: todo.key },
              todo.item,
              _index2.default.createElement(
                'button',
                { 'class': 'del', onClick: function onClick() {
                    return _this2.handleDel(index);
                  } },
                '\u5220\u9664'
              )
            );
          }) : _index2.default.createElement(
            'li',
            { 'class': 'item' },
            '\u65E0'
          )
        )
      );
    }
  }]);

  return Demo;
}(_index2.default.Component);

exports.default = Demo;
},{"../../../index":7,"./Demo.less":25}],30:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":12}],19:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../../../index');

var _index2 = _interopRequireDefault(_index);

require('./Footer.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = function (_React$Component) {
  _inherits(Footer, _React$Component);

  function Footer(props) {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));
  }

  _createClass(Footer, [{
    key: 'render',
    value: function render() {
      return _index2.default.createElement(
        'footer',
        { className: 'Footer' },
        _index2.default.createElement(
          'a',
          { className: 'desc', href: 'https://github.com/Siubaak/kut' },
          'Github - Kut'
        )
      );
    }
  }]);

  return Footer;
}(_index2.default.Component);

exports.default = Footer;
},{"../../../index":7,"./Footer.less":30}],13:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":12}],8:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _Banner = require('./components/Banner');

var _Banner2 = _interopRequireDefault(_Banner);

var _Nav = require('./components/Nav');

var _Nav2 = _interopRequireDefault(_Nav);

var _Content = require('./components/Content');

var _Content2 = _interopRequireDefault(_Content);

var _Demo = require('./components/Demo');

var _Demo2 = _interopRequireDefault(_Demo);

var _Footer = require('./components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

require('./App.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      fix: false
    };
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      window.addEventListener('scroll', function (e) {
        if (window.pageYOffset > 400 && !_this2.state.fix) {
          _this2.setState({ fix: true });
        } else if (window.pageYOffset <= 400 && _this2.state.fix) {
          _this2.setState({ fix: false });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _index2.default.createElement(
        'div',
        { className: 'App' },
        _index2.default.createElement(_Banner2.default, null),
        _index2.default.createElement(
          _Nav2.default,
          { fix: this.state.fix },
          _index2.default.createElement(
            'a',
            { className: { tab: true, color: this.state.fix }, href: '#intro' },
            '\u4ECB\u7ECD'
          ),
          _index2.default.createElement(
            'a',
            { className: { tab: true, color: this.state.fix }, href: '#demo' },
            '\u793A\u4F8B'
          ),
          _index2.default.createElement(
            'a',
            { className: { tab: true, color: this.state.fix }, href: '#docs' },
            '\u6587\u6863'
          )
        ),
        _index2.default.createElement(
          _Content2.default,
          { fix: this.state.fix },
          _index2.default.createElement('div', { id: 'intro', className: 'anchor' }),
          _index2.default.createElement(
            'div',
            { className: 'item' },
            _index2.default.createElement(
              'h1',
              { 'class': 'title' },
              '\u4ECB\u7ECD'
            ),
            _index2.default.createElement(
              'p',
              { 'class': 'desc indent' },
              'Kut\uFF0C\u4E00\u4E2A\u7B80\u5355\u7684React-Like\u7684\u524D\u7AEF\u89C6\u56FE\u6E32\u67D3\u5E93\uFF0C\u662F\u5728\u5B66\u4E60React\u6E90\u7801\u65F6\u9020\u7684\u8F6E\u5B50\u3002\u76EE\u524DKut\u652F\u6301\u7684\u65B9\u6CD5\u4EC5\u6709\u4E24\u4E2A\uFF0C\u5373createElement\u3001render\uFF0C\u540C\u65F6\u4E5F\u652F\u6301\u7EC4\u4EF6\u5316\u5F00\u53D1\uFF0C\u5373Component\u7C7B\u3002\u5DF2\u7ECF\u80FD\u6EE1\u8DB3\u90E8\u5206\u5F00\u53D1\u9700\u6C42\uFF0C\u8FD9\u4E2A\u7F51\u9875\u672C\u8EAB\u5C31\u662F\u57FA\u4E8EKut\u6784\u5EFA\u7684\uFF0C\u6027\u80FD\u8FD8\u884C\u3002'
            ),
            _index2.default.createElement(
              'p',
              { 'class': 'desc indent' },
              '\u7531\u4E8E\u662F\u53C2\u8003(\u6284)\u7684React\uFF0C\u6240\u4EE5Kut\u57FA\u672C\u7684\u5B9E\u73B0\u903B\u8F91\u548CReact\u662F\u76F8\u4F3C\u7684\uFF0CKut\u8FDB\u884C\u4E86\u6539\u8FDB\u7684\u4E00\u4E2A\u5730\u65B9\u662Fdiff\u7B97\u6CD5\u3002React\u7684diff\u7B97\u6CD5\u6211\u79F0\u5176\u4E3A\u524D\u5411diff\uFF0C',
              _index2.default.createElement(
                'a',
                { href: 'https://zhuanlan.zhihu.com/p/20346379' },
                '\u8FD9\u7BC7\u6587\u7AE0'
              ),
              '\u8BB2\u5F97\u5F88\u597D\uFF0C\u6211\u5C31\u4E0D\u8D58\u8FF0\u4E86\u3002\u5BF9\u4E8E\u628A\u5143\u7D20\u4ECE\u5217\u8868\u4E2D\u5E95\u90E8\u632A\u5230\u9876\u90E8\u7684\u505A\u6CD5\uFF0CReact\u7684\u524D\u5411diff\u66F4\u65B0\u64CD\u4F5C\u8FC7\u591A\u4F1A\u5F71\u54CD\u6027\u80FD\uFF0C\u800CKut\u5F15\u5165\u4E86\u540E\u5411diff\uFF0C\u5E76\u53D6\u524D\u5411diff\u548C\u540E\u5411diff\u7684\u8F83\u4F18\u7ED3\u679C\u8FDB\u884C\u66F4\u65B0\uFF0C\u4ECE\u800C\u63D0\u5347\u6027\u80FD\u3002\u5927\u5BB6\u53EF\u4EE5\u5BF9\u793A\u4F8B\u4E2D\u7684\u5F85\u529E\u4E8B\u9879\u8FDB\u884C\u6DFB\u52A0\u3001\u6253\u4E71\u6765\u4F53\u9A8C\u3002'
            ),
            _index2.default.createElement(
              'p',
              { 'class': 'desc indent' },
              '\u7531\u8877\u611F\u53F9\u4E00\u4E0BReact\u5B9E\u5728\u662F\u592A\u5F3A\u5927\u4E86\uFF0C\u7279\u522B\u662FFiber\u3002\u63A5\u4E0B\u6765\u6211\u4F1A\u6162\u6162\u7684\u5B8C\u5584Kut\uFF0C\u4EE5\u652F\u6301Context\u3001Portal\u7B49\u7279\u6027\u3002\u6B22\u8FCE\u5927\u5BB6Pull Request\u548CStar\u3002'
            )
          ),
          _index2.default.createElement('div', { id: 'demo', className: 'anchor' }),
          _index2.default.createElement(
            'div',
            { className: 'item' },
            _index2.default.createElement(
              'h1',
              { 'class': 'title' },
              '\u793A\u4F8B'
            ),
            _index2.default.createElement(_Demo2.default, null)
          ),
          _index2.default.createElement('div', { id: 'docs', className: 'anchor' }),
          _index2.default.createElement(
            'div',
            { className: 'item' },
            _index2.default.createElement(
              'h1',
              { 'class': 'title' },
              '\u6587\u6863'
            ),
            _index2.default.createElement(
              'p',
              { 'class': 'desc indent' },
              'Kut\u662F\u57FA\u4E8ETypeScript\u5F00\u53D1\u7684\uFF0C\u4E14\u81EA\u5E26\u4E86.d.ts\u6587\u4EF6\uFF0C\u56E0\u6B64VSCode\u6709\u826F\u597D\u7684\u667A\u80FD\u63D0\u9192\u3002\u5176\u5B9E\u7531\u4E8E\u662F\u53C2\u8003(\u6284)\u7684React\uFF0C\u6240\u4EE5\u63A5\u53E3\u7684\u7528\u6CD5\u57FA\u672C\u4E00\u81F4\u3002'
            ),
            _index2.default.createElement(
              'h2',
              { 'class': 'title' },
              'Kut.Component'
            ),
            _index2.default.createElement(
              'h2',
              { 'class': 'title' },
              'Kut.createElement'
            ),
            _index2.default.createElement(
              'h2',
              { 'class': 'title' },
              'Kut.render'
            )
          )
        ),
        _index2.default.createElement(_Footer2.default, null)
      );
    }
  }]);

  return App;
}(_index2.default.Component);

exports.default = App;
},{"../index":7,"./components/Banner":15,"./components/Nav":16,"./components/Content":17,"./components/Demo":18,"./components/Footer":19,"./App.less":13}],6:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":12}],4:[function(require,module,exports) {
'use strict';

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_index2.default.render(_index2.default.createElement(_App2.default, null), document.getElementById('root'));
},{"../index":7,"./App":8,"./index.less":6}],34:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '55517' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[34,4])
//# sourceMappingURL=./kut-demo.map