"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("./constant");
function assign() {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    if (objects.length === 0) {
        return null;
    }
    else {
        var obj = objects[0];
        for (var i = 1; i < objects.length; ++i) {
            for (var key in objects[i]) {
                if (Object.hasOwnProperty.call(objects[i], key)) {
                    obj[key] = objects[i][key];
                }
            }
        }
        return obj;
    }
}
if (!Object.assign) {
    ;
    Object.assign = assign;
}
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
    }
    else {
        var node = document.createElement('div');
        node.innerHTML = markup;
        return node.firstChild;
    }
}
exports.createNode = createNode;
function getClassString(className) {
    var markup = '';
    if (className == null) {
    }
    else if (typeof className === 'object') {
        markup +=
            Object.keys(className)
                .filter(function (cls) { return className[cls]; })
                .join(' ');
    }
    else if (Array.isArray(className)) {
        markup += className.join(' ');
    }
    else {
        markup += className.toString();
    }
    return markup.trim();
}
exports.getClassString = getClassString;
function getStyleString(style) {
    var markup = '';
    if (style == null) {
    }
    else if (typeof style === 'object') {
        for (var key in style) {
            if (Object.hasOwnProperty.call(style, key)) {
                markup +=
                    key.replace(/[A-Z]/g, function (letter) { return "-" + letter.toLowerCase(); })
                        + (": " + style[key] + "; ");
            }
        }
    }
    else {
        markup += style.toString();
    }
    return markup.trim();
}
exports.getStyleString = getStyleString;
var DidMountSet = (function () {
    function DidMountSet() {
        this._didMountHandlers = [];
    }
    DidMountSet.prototype.add = function (handler) {
        this._didMountHandlers.push(handler);
    };
    DidMountSet.prototype.exec = function () {
        while (this._didMountHandlers.length) {
            var handler = this._didMountHandlers.shift();
            handler();
        }
    };
    return DidMountSet;
}());
exports.DidMountSet = DidMountSet;
exports.didMountSet = new DidMountSet();
var Heap = (function () {
    function Heap(compare) {
        this._arr = [];
        this._compare = compare;
    }
    Object.defineProperty(Heap.prototype, "length", {
        get: function () {
            return this._arr.length;
        },
        enumerable: true,
        configurable: true
    });
    Heap.prototype.push = function (item) {
        this._arr.push(item);
        this._promote(this._arr.length - 1);
    };
    Heap.prototype.shift = function () {
        var m;
        if (this._arr.length > 1) {
            m = this._arr[0];
            this._arr[0] = this._arr.pop();
            this._heapify(0);
        }
        else {
            m = this._arr.pop();
        }
        return m;
    };
    Heap.prototype._heapify = function (i) {
        var l = this._left(i);
        var r = this._right(i);
        var m = i;
        if (this._arr[l] && this._compare(this._arr[l], this._arr[i])) {
            m = l;
        }
        if (this._arr[r] && this._compare(this._arr[r], this._arr[i])) {
            m = r;
        }
        if (m !== i) {
            _a = [this._arr[m], this._arr[i]], this._arr[i] = _a[0], this._arr[m] = _a[1];
            this._heapify(m);
        }
        var _a;
    };
    Heap.prototype._promote = function (i) {
        var p = this._parent(i);
        while (this._arr[p] && this._compare(this._arr[p], this._arr[i])) {
            _a = [this._arr[p], this._arr[i]], this._arr[i] = _a[0], this._arr[p] = _a[1];
            i = p;
            p = this._parent(i);
        }
        var _a;
    };
    Heap.prototype._parent = function (i) {
        return Math.floor((i + 1) / 2) - 1;
    };
    Heap.prototype._left = function (i) {
        return 2 * (i + 1) - 1;
    };
    Heap.prototype._right = function (i) {
        return 2 * (i + 1);
    };
    return Heap;
}());
exports.Heap = Heap;
function shallowEqual(prev, next) {
    for (var key in prev) {
        if (prev[key] !== next[key]) {
            return false;
        }
    }
    for (var key in next) {
        if (prev[key] !== next[key]) {
            return false;
        }
    }
    return true;
}
exports.shallowEqual = shallowEqual;
//# sourceMappingURL=util.js.map