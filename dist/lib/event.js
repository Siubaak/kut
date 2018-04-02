"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("./constant");
var util_1 = require("./util");
var EventListenerSet = (function () {
    function EventListenerSet() {
        var _this = this;
        this._eventListeners = {};
        if (document) {
            constant_1.KUT_SUPPORTED_EVENTS.forEach(function (event) {
                document.addEventListener(event, function (e) {
                    var kutId = e.target.getAttribute
                        && e.target.getAttribute(constant_1.KUT_ID);
                    while (kutId) {
                        var eventListener = _this._eventListeners[kutId] && _this._eventListeners[kutId][event];
                        if (eventListener) {
                            eventListener(e);
                        }
                        kutId = util_1.getParentID(kutId);
                    }
                });
            });
        }
    }
    EventListenerSet.prototype.get = function (kutId, event) {
        return this._eventListeners[kutId][event];
    };
    EventListenerSet.prototype.set = function (kutId, event, eventListener) {
        if (!this._eventListeners[kutId]) {
            this._eventListeners[kutId] = {};
        }
        this._eventListeners[kutId][event] = eventListener;
    };
    EventListenerSet.prototype.del = function (kutId, event) {
        if (this._eventListeners[kutId]) {
            delete this._eventListeners[kutId][event];
        }
    };
    EventListenerSet.prototype.delAll = function (kutId) {
        delete this._eventListeners[kutId];
    };
    return EventListenerSet;
}());
exports.EventListenerSet = EventListenerSet;
exports.eventListenerSet = new EventListenerSet();
//# sourceMappingURL=event.js.map