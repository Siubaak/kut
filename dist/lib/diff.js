"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderer_1 = require("./renderer");
var util_1 = require("./util");
var reconciler_1 = require("./reconciler");
function diff(prevInstances, nextChildren) {
    var prevInstanceMap = {};
    prevInstances.forEach(function (inst, index) {
        return prevInstanceMap[inst.key] = inst;
    });
    var nextInstances = [];
    nextChildren.forEach(function (nextChild, index) {
        var key = nextChild.key != null
            ? 'k_' + nextChild.key
            : '' + index;
        var prevInstance = prevInstanceMap[key];
        if (prevInstance && prevInstance.shouldReceive(nextChild)) {
            reconciler_1.reconciler.enqueueUpdate(prevInstance, nextChild);
            nextInstances.push(prevInstance);
        }
        else {
            var nextInstance = renderer_1.instantiate(nextChild);
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
            if (forwardPrevInstance.index < lastForwardIndex) {
                forwardOps.push({
                    type: 'move',
                    inst: forwardPrevInstance,
                    index: lastForwardIndex,
                });
            }
            lastForwardIndex = Math.max(forwardPrevInstance.index, lastForwardIndex);
        }
        else {
            if (forwardPrevInstance) {
                forwardOps.push({
                    type: 'remove',
                    inst: forwardPrevInstance,
                });
            }
            forwardOps.push({
                type: 'insert',
                inst: forwardNextInstance,
                index: lastForwardIndex,
            });
        }
        var backwardNextInstance = nextInstances[nextInstances.length - index - 1];
        var backwardPrevInstance = prevInstanceMap[backwardNextInstance.key];
        if (backwardPrevInstance === backwardNextInstance) {
            if (backwardPrevInstance.index > lastBackwardIndex) {
                backwardOps.push({
                    type: 'move',
                    inst: backwardPrevInstance,
                    index: lastBackwardIndex,
                });
            }
            lastBackwardIndex = Math.min(backwardPrevInstance.index, lastBackwardIndex);
        }
        else {
            if (backwardPrevInstance) {
                backwardOps.push({
                    type: 'remove',
                    inst: backwardPrevInstance,
                });
            }
            backwardOps.push({
                type: 'insert',
                inst: backwardNextInstance,
                index: lastBackwardIndex,
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
                inst: prevInstanceMap[key],
            });
            backwardOps.push({
                type: 'remove',
                inst: prevInstanceMap[key],
            });
        }
    }
    nextInstances.forEach(function (nextInstance, index) {
        return nextInstance.index = index;
    });
    prevInstances.length = 0;
    prevInstances.push.apply(prevInstances, nextInstances);
    return forwardOps.length < backwardOps.length
        ? { ops: forwardOps, dir: 'forward' }
        : { ops: backwardOps, dir: 'backward' };
}
exports.diff = diff;
function patch(parentId, patches) {
    var container = util_1.getNode(parentId);
    var ops = patches.ops, dir = patches.dir;
    var insertNum = 0;
    ops.forEach(function (op) {
        var beforeIndex = dir === 'forward'
            ? op.index + 1 + insertNum
            : op.index;
        if (op.type === 'remove') {
            op.inst.unmount();
        }
        else {
            if (op.type === 'insert') {
                ++insertNum;
                var markup = op.inst.mount(parentId + ":" + op.inst.key);
                var node = util_1.createNode(markup);
                var beforeNode = container.children[beforeIndex];
                container.insertBefore(node, beforeNode);
                util_1.didMountSet.exec();
            }
            else {
                var node = op.inst.node;
                var beforeNode = container.children[beforeIndex];
                container.insertBefore(node, beforeNode);
            }
        }
    });
}
exports.patch = patch;
//# sourceMappingURL=diff.js.map