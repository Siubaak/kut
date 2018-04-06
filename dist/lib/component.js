"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Component = (function () {
    function Component(props) {
        this.state = {};
        this._update = function (callback, skipShouldUpdate) { };
        this.props = props;
    }
    Component.prototype.setState = function (state, callback) {
        this.state = Object.assign({}, this.state, state);
        if (callback) {
            callback = callback.bind(this);
        }
        this._update(callback, false);
    };
    Component.prototype.forceUpdate = function (callback) {
        if (callback) {
            callback = callback.bind(this);
        }
        this._update(callback, true);
    };
    Component.prototype.render = function (props) {
        if (props === void 0) { props = this.props; }
        return null;
    };
    return Component;
}());
exports.Component = Component;
//# sourceMappingURL=component.js.map