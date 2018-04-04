"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var Component = (function () {
    function Component(props) {
        this.state = {};
        this.update = function (callback) { };
        this.props = props;
    }
    Component.prototype.setState = function (state, callback) {
        this.state = util_1.assign({}, this.state, state);
        if (callback) {
            callback = callback.bind(this);
        }
        this.update(callback);
    };
    Component.prototype.forceUpdate = function (callback) {
        if (callback) {
            callback = callback.bind(this);
        }
        this.update(callback);
    };
    Component.prototype.render = function (props) {
        if (props === void 0) { props = this.props; }
        return null;
    };
    return Component;
}());
exports.Component = Component;
//# sourceMappingURL=component.js.map