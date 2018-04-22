import { KutChild, KutElement } from './element'
import { KutInstance } from './instance'
import { instantiate } from './renderer'
import { getNode, createNode, didMountSet } from './util'
import { reconciler } from './reconciler'

export interface PatchOp {
  type: 'insert' | 'move' | 'remove'
  inst: KutInstance
  index?: number
}

export interface Patches {
  ops: PatchOp[],
  dir: 'forward' | 'backward'
}

/**
 * 对比两个数组，返回从旧节点数组到新节点数组的最少操作
 * 采用前向diff和后向diff，并取两者操作较少这返回
 * diff方法会更新prevInstances的引用数组
 * @param prevInstances 旧节点对应instance数组
 * @param nextChildren 新节点对应element数组
 */
export function diff(
  prevInstances: KutInstance[],
  nextChildren: KutChild[],
): Patches {
  // 以key或index构造map，以保证O(1)查询
  const prevInstanceMap: { [key: string]: KutInstance } = {}
  prevInstances.forEach((inst: KutInstance, index: number) =>
    // key重复也不管
    prevInstanceMap[inst.key] = inst
  )
  // 保存nextChildren对应的instances
  const nextInstances: KutInstance[] = []
  // 遍历nextChildren
  nextChildren.forEach((nextChild: KutChild, index: number) => {
    // 获取key，如果有则使用key，没有则赋予一个index
    const key = (nextChild as KutElement).key != null
      ? 'k_' + (nextChild as KutElement).key
      : '' + index
    // 获取prevInstance
    const prevInstance: KutInstance = prevInstanceMap[key]
    // 如果prevInstance存在且调用shouldReceive判断是否为相同节点
    // 若相同对prevInstance进行更新，否则新建instance
    // 然后均按序存在nextInstance中
    if (prevInstance && prevInstance.shouldReceive(nextChild)) {
      reconciler.enqueueUpdate(prevInstance, nextChild)
      // 更新index
      prevInstance.index = index
      nextInstances.push(prevInstance)
    } else {
      const nextInstance = instantiate(nextChild)
      // 赋予默认index
      nextInstance.index = index
      nextInstances.push(nextInstance)
    }
  })
  // 前向diff的patch记录
  const forwardOps: PatchOp[] = []
  // 后向diif的patch记录
  const backwardOps: PatchOp[] = []
  // 前向diff时候prevInstances中复用节点在原节点组中最右的位置，作为固定位置
  let lastForwardIndex: number = -1
  // 后向diff时候prevInstances中复用节点在原节点组中最左的位置，作为固定位置
  let lastBackwardIndex: number = prevInstances.length
  for(let index: number = 0; index < nextInstances.length; ++index) {
    // 前向diff
    const forwardNextInstance = nextInstances[index]
    const forwardPrevInstance: KutInstance = prevInstanceMap[forwardNextInstance.key]
    // 判断是否为复用节点
    if (forwardPrevInstance === forwardNextInstance) {
      // 为复用节点，如果在固定位置前则需要move到固定位置后
      if (forwardPrevInstance.index < lastForwardIndex) {
        forwardOps.push({
          type: 'move',
          inst: forwardPrevInstance,
          index: lastForwardIndex,
        })
      }
      // 更新固定位置
      lastForwardIndex = Math.max(forwardPrevInstance.index, lastForwardIndex)
    } else {
      // 不是复用节点，需要insert新节点，若存在就节点则remove掉
      if (forwardPrevInstance) {
        forwardOps.push({
          type: 'remove',
          inst: forwardPrevInstance,
        })
      }
      forwardOps.push({
        type: 'insert',
        inst: forwardNextInstance,
        index: lastForwardIndex,
      })
    }
    // 后向diff
    const backwardNextInstance = nextInstances[nextInstances.length - index - 1]
    const backwardPrevInstance: KutInstance = prevInstanceMap[backwardNextInstance.key]
    // 过程同前向diff，但固定位置判断以及更新与前向相反
    if (backwardPrevInstance === backwardNextInstance) {
      if (backwardPrevInstance.index > lastBackwardIndex) {
        backwardOps.push({
          type: 'move',
          inst: backwardPrevInstance,
          index: lastBackwardIndex,
        })
      }
      lastBackwardIndex = Math.min(backwardPrevInstance.index, lastBackwardIndex)
    } else {
      if (backwardPrevInstance) {
        backwardOps.push({
          type: 'remove',
          inst: backwardPrevInstance,
        })
      }
      backwardOps.push({
        type: 'insert',
        inst: backwardNextInstance,
        index: lastBackwardIndex,
      })
    }
  }
  // 同样构造map，以保证O(1)查询
  const nextInstanceMap: { [key: string]: KutInstance } = {}
  nextInstances.forEach((inst: KutInstance, index: number) =>
    // key重复也不管
    nextInstanceMap[inst.key] = inst
  )
  // 去掉prevInstances中多余节点
  for (const key in prevInstanceMap) {
    if (!nextInstanceMap[key]) {
      forwardOps.push({
        type: 'remove',
        inst: prevInstanceMap[key],
      })
      backwardOps.push({
        type: 'remove',
        inst: prevInstanceMap[key],
      })
    }
  }
  // 更新_index
  nextInstances.forEach(
    (nextInstance: KutInstance, index: number) =>
      nextInstance.index = index
  )
  // 替换_childInstances，直接赋值会丢失引用
  prevInstances.length = 0
  prevInstances.push(...nextInstances)
  // 取前向diif和后向diif中较少patch的返回
  return forwardOps.length < backwardOps.length
    ? { ops: forwardOps, dir: 'forward' }
    : { ops: backwardOps, dir: 'backward' }
}

/**
 * 对container下的节点进行修改
 * @param parentId 
 * @param patches 
 */
export function patch(parentId: string, patches: Patches): void {
  const container: HTMLElement = getNode(parentId)
  const { ops, dir } = patches
  // 用于前向patch时insert引起的before节点后移，后向patch无此问题
  let insertNum: number = 0
  ops.forEach((op: PatchOp) => {
    // 确定insertBefore的节点index
    const beforeIndex: number =
      dir === 'forward'
      ? op.index + 1 + insertNum
      : op.index
    if (op.type === 'remove') {
      // 移除节点
      op.inst.unmount()
    } else {
      if (op.type === 'insert') {
        // 插入节点，需要调用createNode创建DOM节点
        ++insertNum
        const markup: string = op.inst.mount(`${parentId}:${op.inst.key}`)
        const node = createNode(markup)
        const beforeNode = container.children[beforeIndex]
        // 无需判断beforeNode是否存在，
        // 当beforeNode为undefined时，insertBefore等效于appendChild方法
        container.insertBefore(node, beforeNode)
        // 调用所有componentDidMount方法
        didMountSet.exec()
      } else {
        // 移动节点，只需获取需要移动的节点
        const node = op.inst.node
        const beforeNode = container.children[beforeIndex]
        // 无需判断beforeNode是否存在，
        // 当beforeNode为undefined时，insertBefore等效于appendChild方法
        container.insertBefore(node, beforeNode)
      }
    }
  })
}
