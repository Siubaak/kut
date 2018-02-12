"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var defaultUpdater = {
    enqueueSetState: function (instance, state) { },
    enqueueForceUpdate: function (instance) { },
};
var Component = (function () {
    function Component(props, updater) {
        if (updater === void 0) { updater = defaultUpdater; }
        this.props = props;
        this.updater = updater;
    }
    Component.prototype.setState = function (state) {
        this.updater.enqueueSetState(this, state);
    };
    Component.prototype.render = function (props) {
        if (props === void 0) { props = this.props; }
        return null;
    };
    return Component;
}());
exports.Component = Component;
//# sourceMappingURL=component.js.map