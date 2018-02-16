"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Component = (function () {
    function Component(props) {
        this.props = props;
    }
    Component.prototype.setState = function (state) {
        this.state = Object.assign({}, this.state, state);
        var renderElement = this.render();
        this.instance.update(renderElement);
    };
    Component.prototype.render = function (props) {
        if (props === void 0) { props = this.props; }
        return null;
    };
    Component.prototype.componentWillMount = function () { };
    Component.prototype.componentDidMount = function () { };
    Component.prototype.componentWillUpdate = function () { };
    Component.prototype.componentDidUpdate = function () { };
    Component.prototype.shouldComponentUpdate = function () {
        return true;
    };
    return Component;
}());
exports.Component = Component;
//# sourceMappingURL=component.js.map