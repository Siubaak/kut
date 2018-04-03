"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Reconciler = (function () {
    function Reconciler() {
        this._dirtyInstances = [];
        this._isBatchUpdating = false;
    }
    Reconciler.prototype.enqueueUpdate = function (dirtyInstance, nextElement) {
        var _this = this;
        this._dirtyInstances.push({
            instance: dirtyInstance,
            element: nextElement,
        });
        if (!this._isBatchUpdating) {
            this._isBatchUpdating = true;
            setTimeout(function () {
                while (_this._dirtyInstances.length) {
                    var _a = _this._dirtyInstances.pop(), instance = _a.instance, element = _a.element;
                    instance.update(element);
                }
                _this._isBatchUpdating = false;
                if (dirtyInstance.component) {
                    dirtyInstance.component.componentDidUpdate();
                }
            }, 0);
        }
    };
    return Reconciler;
}());
exports.Reconciler = Reconciler;
exports.reconciler = new Reconciler();
//# sourceMappingURL=reconciler.js.map