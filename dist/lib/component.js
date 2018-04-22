"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Component = (function () {
    function Component(props, context) {
        this.state = {};
        this._updater = {
            enqueueSetState: function (partialState, callback) { },
            enqueueForceUpdate: function (callback) { },
        };
        this.props = props;
        this.context = context;
    }
    Component.prototype.setState = function (partialState, callback) {
        if (typeof partialState === 'function') {
            partialState = partialState.bind(this);
        }
        if (typeof callback === 'function') {
            callback = callback.bind(this);
        }
        this._updater.enqueueSetState(partialState, callback);
    };
    Component.prototype.forceUpdate = function (callback) {
        if (typeof callback === 'function') {
            callback = callback.bind(this);
        }
        this._updater.enqueueForceUpdate(callback);
    };
    Component.prototype.render = function (props) {
        if (props === void 0) { props = this.props; }
        return null;
    };
    return Component;
}());
exports.Component = Component;
//# sourceMappingURL=component.js.map