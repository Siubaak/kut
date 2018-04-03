import { KutChild } from './element'
import { KutInstance, ComponentInstance } from './instance'

interface DirtyInstance {
  instance: KutInstance,
  element: KutChild,
}

export class Reconciler {
  private _dirtyInstances: DirtyInstance[] = []
  private _isBatchUpdating: boolean = false
  enqueueUpdate(dirtyInstance: KutInstance, nextElement: KutChild): void {
    this._dirtyInstances.push({
      instance: dirtyInstance,
      element: nextElement,
    })
    if (!this._isBatchUpdating) {
      this._isBatchUpdating = true
      setTimeout(() => {
        while(this._dirtyInstances.length) {
          const { instance, element } = this._dirtyInstances.pop()
          instance.update(element)
        }
        this._isBatchUpdating = false
        if ((dirtyInstance as ComponentInstance).component) {
          (dirtyInstance as ComponentInstance).component.componentDidUpdate()
        }
      }, 0)
    }
  }
}

export const reconciler: Reconciler = new Reconciler()