"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("./constant");
function getParentID(childID) {
    var regex = /[:]\w+$/;
    return regex.test(childID) && childID.replace(regex, '');
}
exports.getParentID = getParentID;
function getNode(kutId) {
    return document.querySelector("[" + constant_1.KUT_ID + "=\"" + kutId + "\"]");
}
exports.getNode = getNode;
function createNode(markup) {
    if (markup === '') {
        return document.createTextNode('');
    }
    else {
        var node = document.createElement('div');
        node.innerHTML = markup;
        return node.firstChild;
    }
}
exports.createNode = createNode;
function getClassString(className) {
    var markup = '';
    if (className == null) {
    }
    else if (typeof className === 'object') {
        markup +=
            Object.keys(className)
                .filter(function (cls) { return className[cls]; })
                .join(' ');
    }
    else if (Array.isArray(className)) {
        markup += className.join(' ');
    }
    else {
        markup += className.toString();
    }
    return markup.trim();
}
exports.getClassString = getClassString;
function getStyleString(style) {
    var markup = '';
    if (style == null) {
    }
    else if (typeof style === 'object') {
        for (var key in style) {
            if (Object.hasOwnProperty.call(style, key)) {
                markup +=
                    key.replace(/[A-Z]/g, function (letter) { return "-" + letter.toLowerCase(); })
                        + (": " + style[key] + "; ");
            }
        }
    }
    else {
        markup += style.toString();
    }
    return markup.trim();
}
exports.getStyleString = getStyleString;
//# sourceMappingURL=util.js.map