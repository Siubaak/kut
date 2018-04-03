"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DirtyInstanceMap = (function () {
    function DirtyInstanceMap() {
        this._dirtyInstanceMap = {};
    }
    Object.defineProperty(DirtyInstanceMap.prototype, "length", {
        get: function () {
            return Object.keys(this._dirtyInstanceMap).length;
        },
        enumerable: true,
        configurable: true
    });
    DirtyInstanceMap.prototype.push = function (dirtyInstance) {
        this._dirtyInstanceMap[dirtyInstance.instance.kutId] = dirtyInstance;
    };
    DirtyInstanceMap.prototype.pop = function () {
        var kutIds = Object.keys(this._dirtyInstanceMap);
        kutIds.sort(function (id1, id2) {
            var len1 = id1.split(':').length;
            var len2 = id2.split(':').length;
            return len1 - len2;
        });
        var dirtyInstance = this._dirtyInstanceMap[kutIds[0]];
        delete this._dirtyInstanceMap[kutIds[0]];
        return dirtyInstance;
    };
    return DirtyInstanceMap;
}());
var Reconciler = (function () {
    function Reconciler() {
        this._dirtyInstances = new DirtyInstanceMap();
        this._isBatchUpdating = false;
    }
    Reconciler.prototype.enqueueUpdate = function (dirtyInstance, nextElement) {
        this._dirtyInstances.push({
            instance: dirtyInstance,
            element: nextElement,
        });
        if (!this._isBatchUpdating) {
            this._runBatchUpdate();
        }
    };
    Reconciler.prototype._runBatchUpdate = function () {
        var _this = this;
        this._isBatchUpdating = true;
        setTimeout(function () {
            while (_this._dirtyInstances.length) {
                var _a = _this._dirtyInstances.pop(), instance = _a.instance, element = _a.element;
                if (instance.kutId) {
                    instance.update(element);
                    if (instance.component) {
                        instance.component.componentDidUpdate();
                    }
                }
            }
            _this._isBatchUpdating = false;
        }, 0);
    };
    return Reconciler;
}());
exports.Reconciler = Reconciler;
exports.reconciler = new Reconciler();
//# sourceMappingURL=reconciler.js.map