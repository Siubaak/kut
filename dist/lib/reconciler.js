"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var DirtyInstanceSet = (function () {
    function DirtyInstanceSet() {
        this._map = {};
        this._arr = new util_1.Heap(function (contrast, self) {
            return contrast.split(':').length < self.split(':').length;
        });
    }
    Object.defineProperty(DirtyInstanceSet.prototype, "length", {
        get: function () {
            return this._arr.length;
        },
        enumerable: true,
        configurable: true
    });
    DirtyInstanceSet.prototype.push = function (dirtyInstance) {
        var kutId = dirtyInstance.instance.kutId;
        if (!this._map[kutId]) {
            this._arr.push(kutId);
            this._map[kutId] = dirtyInstance;
        }
        else {
            this._map[kutId].instance = dirtyInstance.instance;
            this._map[kutId].element = dirtyInstance.element;
            this._map[kutId].callbacks =
                this._map[kutId].callbacks.concat(dirtyInstance.callbacks);
        }
    };
    DirtyInstanceSet.prototype.shift = function () {
        var kutId = this._arr.shift();
        var dirtyInstance = this._map[kutId];
        delete this._map[kutId];
        return dirtyInstance;
    };
    return DirtyInstanceSet;
}());
var Reconciler = (function () {
    function Reconciler() {
        this._dirtyInstanceSet = new DirtyInstanceSet();
        this._isBatchUpdating = false;
    }
    Reconciler.prototype.enqueueUpdate = function (instance, element, callback) {
        var dirtyInstance = { instance: instance, element: element, callbacks: [] };
        if (typeof callback === 'function') {
            dirtyInstance.callbacks.push(callback);
        }
        this._dirtyInstanceSet.push(dirtyInstance);
        if (!this._isBatchUpdating) {
            this._runBatchUpdate();
        }
    };
    Reconciler.prototype._runBatchUpdate = function () {
        var _this = this;
        this._isBatchUpdating = true;
        requestAnimationFrame(function () {
            while (_this._dirtyInstanceSet.length) {
                var _a = _this._dirtyInstanceSet.shift(), instance = _a.instance, element = _a.element, callbacks = _a.callbacks;
                if (instance.kutId) {
                    instance.update(element);
                    while (callbacks.length) {
                        var callback = callbacks.shift();
                        callback();
                    }
                }
            }
            _this._isBatchUpdating = false;
        });
    };
    return Reconciler;
}());
exports.Reconciler = Reconciler;
exports.reconciler = new Reconciler();
//# sourceMappingURL=reconciler.js.map