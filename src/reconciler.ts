import { KutChild } from './element'
import { KutInstance, ComponentInstance } from './instance'
import { Heap, is } from './util'

interface DirtyInstance {
  instance: KutInstance
  element: KutChild
  didUpdate: () => void
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
  shift(): DirtyInstance {
    const kutId = this._arr.shift()
    const dirtyInstance = this._map[kutId]
    delete this._map[kutId]
    return dirtyInstance
  }
}

/**
 * 更新调和器类，用于异步更新调和，合并Instance多次更新
 * mount和unmount都是同步的，只有update是异步的
 */
export class Reconciler {
  private readonly _dirtyInstanceSet = new DirtyInstanceSet() 
  private _isBatchUpdating: boolean = false

  enqueueUpdate(
    instance: KutInstance,
    element: KutChild = null,
    didUpdate?: () => void,
  ): void {
    this._dirtyInstanceSet.push({ instance, element, didUpdate })
    // 如果没有批量更新，则进行批量更新
    if (!this._isBatchUpdating) {
      this._runBatchUpdate()
    }
  }

  private _runBatchUpdate() {
    this._isBatchUpdating = true
    requestAnimationFrame(() => {
      while (this._dirtyInstanceSet.length) {
        const { instance, element, didUpdate } = this._dirtyInstanceSet.shift()
        // 验证kutId，防止推进更新队列之后被unmount掉了
        if (instance.kutId) {
          instance.update(element)
          // 如果有componentDidUpdate则调用
          if (is.function(didUpdate)) {
            didUpdate()
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
