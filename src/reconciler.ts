import { KutChild } from './element'
import { KutInstance, ComponentInstance } from './instance'
import { Heap } from './util'

interface DirtyInstance {
  instance: KutInstance,
  element: KutChild,
  callback: () => void,
}

/**
 * dirtyInstance储存集合
 */
class DirtyInstanceSet {
  private readonly _map: { [ id: string ]: DirtyInstance } = {}
  private readonly _arr: Heap<string> = new Heap(
    (contrast: string, self: string) =>
      contrast.split(':').length < self.split(':').length
  )
  get length(): number {
    return this._arr.length
  }
  push(dirtyInstance: DirtyInstance): void {
    const kutId: string = dirtyInstance.instance.kutId
    if (!this._map[kutId]) {
      this._arr.push(kutId)
    }
    this._map[kutId] = dirtyInstance
  }
  pop(): DirtyInstance {
    const kutId = this._arr.pop()
    const dirtyInstance = this._map[kutId]
    delete this._map[kutId]
    return dirtyInstance
  }
}

/**
 * 更新调和器类，用于异步更新调和，合并Instance多次更新。
 * mount和unmount都是同步的，只有update是异步的。
 */
export class Reconciler {
  private readonly _dirtyInstanceSet = new DirtyInstanceSet() 
  private _isBatchUpdating: boolean = false
  enqueueUpdate(
    instance: KutInstance,
    element: KutChild,
    callback?: () => void,
  ): void {
    this._dirtyInstanceSet.push({ instance, element, callback })
    // 如果没有批量更新，则进行批量更新
    if (!this._isBatchUpdating) {
      this._runBatchUpdate()
    }
  }
  private _runBatchUpdate() {
    this._isBatchUpdating = true
    requestAnimationFrame(() => {
      while(this._dirtyInstanceSet.length) {
        const { instance, element, callback } = this._dirtyInstanceSet.pop()
        // 验证kutId，防止被推进更新队列之后被unmount掉了
        if (instance.kutId) {
          instance.update(element)
          if (callback) {
            // 如果有callback则调用，主要用于componentDidUpdate调用
            callback()
          }
        }
      }
      this._isBatchUpdating = false
    })
  }
}

/**
 * 导出Reconciler的单例
 */
export const reconciler: Reconciler = new Reconciler()