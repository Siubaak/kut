"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Component = (function () {
    function Component(props) {
        this.state = {};
        this._update = function (skipShouldUpdate) { };
        this.props = props;
    }
    Component.prototype.setState = function (state) {
        this.state = Object.assign({}, this.state, state);
        this._update(false);
    };
    Component.prototype.forceUpdate = function () {
        this._update(true);
    };
    Component.prototype.render = function (props) {
        if (props === void 0) { props = this.props; }
        return null;
    };
    return Component;
}());
exports.Component = Component;
//# sourceMappingURL=component.js.map