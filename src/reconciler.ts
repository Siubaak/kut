import { KutChild } from './element'
import { KutInstance, ComponentInstance } from './instance'

interface DirtyInstance {
  instance: KutInstance,
  element: KutChild,
}

// pop的复杂度有点高，加上batchUpdate的while有n2lgn，后期改成最小堆实现
class DirtyInstanceMap {
  private _dirtyInstanceMap: { [ id: string ]: DirtyInstance } = {}
  get length() {
    return Object.keys(this._dirtyInstanceMap).length
  }
  push(dirtyInstance: DirtyInstance) {
    this._dirtyInstanceMap[dirtyInstance.instance.kutId] = dirtyInstance
  }
  pop() {
    const kutIds: string[] = Object.keys(this._dirtyInstanceMap)
    kutIds.sort((id1, id2) => {
      // 根据层级区分父子节点，以便先更新父节点，避免子节点重复更新
      const len1 = id1.split(':').length
      const len2 = id2.split(':').length
      // 层级长度越小，节点等级越高
      return len1 - len2
    })
    const dirtyInstance: DirtyInstance = this._dirtyInstanceMap[kutIds[0]]
    delete this._dirtyInstanceMap[kutIds[0]]
    return dirtyInstance
  }
}

// mount和unmount都是同步的，只有update是异步的
export class Reconciler {
  private _dirtyInstances = new DirtyInstanceMap() 
  private _isBatchUpdating: boolean = false
  enqueueUpdate(dirtyInstance: KutInstance, nextElement: KutChild): void {
    this._dirtyInstances.push({
      instance: dirtyInstance,
      element: nextElement,
    })
    // 如果没有批量更新，则进行批量更新
    if (!this._isBatchUpdating) {
      this._runBatchUpdate()
    }
  }
  private _runBatchUpdate() {
    this._isBatchUpdating = true
    setTimeout(() => {
      while(this._dirtyInstances.length) {
        const { instance, element } = this._dirtyInstances.pop()
        // 验证kutId，防止被推进更新队列之后被unmount掉了
        if (instance.kutId) {
          instance.update(element)
          if ((instance as ComponentInstance).component) {
            (instance as ComponentInstance).component.componentDidUpdate()
          }
        }
      }
      this._isBatchUpdating = false
    }, 0)
  }
}

export const reconciler: Reconciler = new Reconciler()