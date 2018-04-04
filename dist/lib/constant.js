"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KUT_ID = 'data-kutid';
exports.KUT_RESERVED_PROPS = {
    key: true,
    ref: true,
};
exports.CUT_ON_REGEX = /^on/;
var eventHandlers = Object.keys(window || {}).filter(function (key) { return exports.CUT_ON_REGEX.test(key); });
exports.KUT_SUPPORTED_EVENTS = eventHandlers.map(function (key) { return key.replace(exports.CUT_ON_REGEX, ''); });
exports.KUT_SUPPORTED_EVENT_HANDLERS = {};
eventHandlers.forEach(function (eventHandler) {
    exports.KUT_SUPPORTED_EVENT_HANDLERS[eventHandler] = true;
});
//# sourceMappingURL=constant.js.map