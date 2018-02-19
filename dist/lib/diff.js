"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = require("./renderer");
function diff(prevInstances, nextChildren) {
    var prevInstanceMap = {};
    prevInstances.forEach(function (inst, index) {
        return prevInstanceMap[inst.key] = inst;
    });
    var nextInstances = [];
    nextChildren.forEach(function (nextChild, index) {
        var key = nextChild.key != null
            ? '_key_' + nextChild.key
            : '_index_' + index;
        var prevInstance = prevInstanceMap[key];
        if (prevInstance && prevInstance.shouldReceive(nextChild)) {
            prevInstance.update(nextChild);
            nextInstances.push(prevInstance);
        }
        else {
            var nextInstance = renderer_1.instantiate(nextChild);
            nextInstance._index = index;
            nextInstances.push(nextInstance);
        }
    });
    var forwardOps = [];
    var backwardOps = [];
    var lastForwardIndex = -1;
    var lastBackwardIndex = prevInstances.length;
    for (var index = 0; index < nextInstances.length; ++index) {
        var forwardNextInstance = nextInstances[index];
        var forwardPrevInstance = prevInstanceMap[forwardNextInstance.key];
        if (forwardPrevInstance === forwardNextInstance) {
            if (forwardPrevInstance._index < lastForwardIndex) {
                forwardOps.push({
                    type: 'move',
                    index: lastForwardIndex,
                    inst: forwardPrevInstance,
                });
            }
            lastForwardIndex = Math.max(forwardPrevInstance._index, lastForwardIndex);
        }
        else {
            if (forwardPrevInstance) {
                forwardOps.push({
                    type: 'remove',
                    index: -1,
                    inst: forwardPrevInstance,
                });
            }
            forwardOps.push({
                type: 'insert',
                index: lastForwardIndex,
                inst: forwardNextInstance,
            });
        }
        var backwardNextInstance = nextInstances[nextInstances.length - index - 1];
        var backwardPrevInstance = prevInstanceMap[backwardNextInstance.key];
        if (backwardPrevInstance === backwardNextInstance) {
            if (backwardPrevInstance._index > lastBackwardIndex) {
                backwardOps.push({
                    type: 'move',
                    index: lastBackwardIndex,
                    inst: backwardPrevInstance,
                });
            }
            lastBackwardIndex = Math.min(backwardPrevInstance._index, lastBackwardIndex);
        }
        else {
            if (backwardPrevInstance) {
                backwardOps.push({
                    type: 'remove',
                    index: -1,
                    inst: backwardPrevInstance,
                });
            }
            backwardOps.push({
                type: 'insert',
                index: lastBackwardIndex,
                inst: backwardNextInstance,
            });
        }
    }
    var nextInstanceMap = {};
    nextInstances.forEach(function (inst, index) {
        return nextInstanceMap[inst.key] = inst;
    });
    for (var key in prevInstanceMap) {
        if (!nextInstanceMap[key]) {
            forwardOps.push({
                type: 'remove',
                index: -1,
                inst: prevInstanceMap[key],
            });
            backwardOps.push({
                type: 'remove',
                index: -1,
                inst: prevInstanceMap[key],
            });
        }
    }
    nextInstances.forEach(function (nextInstance, index) { return nextInstance._index = index; });
    prevInstances.length = 0;
    prevInstances.push.apply(prevInstances, nextInstances);
    return forwardOps.length < backwardOps.length
        ? { ops: forwardOps, dir: 'forward' }
        : { ops: backwardOps, dir: 'backward' };
}
exports.diff = diff;
function patch(container, patches) {
    var ops = patches.ops, dir = patches.dir;
    var insertNum = 0;
    ops.forEach(function (op) {
        var beforeIndex = dir === 'forward'
            ? op.index + 1 + insertNum
            : op.index;
        switch (op.type) {
            case 'insert': {
                var beforeNode = container.children[beforeIndex];
                var node = op.inst.mount(container);
                if (beforeNode !== undefined) {
                    container.insertBefore(node, beforeNode);
                }
                else {
                    container.appendChild(node);
                }
                ++insertNum;
                break;
            }
            case 'move': {
                var beforeNode = container.children[beforeIndex];
                if (beforeNode !== undefined) {
                    container.insertBefore(op.inst._node, beforeNode);
                }
                else {
                    container.appendChild(op.inst._node);
                }
                break;
            }
            default: {
                op.inst.unmount();
            }
        }
    });
}
exports.patch = patch;
//# sourceMappingURL=diff.js.map