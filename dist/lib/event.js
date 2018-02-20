"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("./constant");
var util_1 = require("./util");
var eventHanlders = {};
if (document) {
    constant_1.KUT_SUPPORTED_EVENTS.forEach(function (event) {
        document.addEventListener(event, function (e) {
            var kutId = e.target.getAttribute
                && e.target.getAttribute(constant_1.KUT_ID);
            while (kutId) {
                var eventHanlder = eventHanlders[kutId] && eventHanlders[kutId][event];
                if (eventHanlder) {
                    eventHanlder(e);
                }
                kutId = util_1.getParentID(kutId);
            }
        });
    });
}
function setEventListener(kutId, event, eventHanlder) {
    if (!eventHanlders[kutId]) {
        eventHanlders[kutId] = {};
    }
    eventHanlders[kutId][event] = eventHanlder;
}
exports.setEventListener = setEventListener;
function removeEventListener(kutId, event) {
    if (eventHanlders[kutId]) {
        delete eventHanlders[kutId][event];
    }
}
exports.removeEventListener = removeEventListener;
function removeAllEventListener(kutId) {
    delete eventHanlders[kutId];
}
exports.removeAllEventListener = removeAllEventListener;
//# sourceMappingURL=event.js.map