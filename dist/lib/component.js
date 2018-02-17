"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Component = (function () {
    function Component(props) {
        this.props = props;
    }
    Component.prototype.setState = function (state) {
        this.state = Object.assign({}, this.state, state);
        this._instance.update(null, this.state);
    };
    Component.prototype.forceUpdate = function () {
        this._instance.update(null, this.state);
    };
    Component.prototype.render = function (props) {
        if (props === void 0) { props = this.props; }
        return null;
    };
    Component.prototype.componentWillMount = function () { };
    Component.prototype.componentDidMount = function () { };
    Component.prototype.componentWillReceiveProps = function (nextProps) { };
    Component.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return true;
    };
    Component.prototype.componentWillUpdate = function (nextProps, nextState) { };
    Component.prototype.componentDidUpdate = function () { };
    Component.prototype.componentWillUnmount = function () { };
    return Component;
}());
exports.Component = Component;
//# sourceMappingURL=component.js.map