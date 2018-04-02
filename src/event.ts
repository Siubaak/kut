import { KUT_ID, KUT_SUPPORTED_EVENTS } from './constant'
import { getParentID } from './util'

// 事件委托集合
export class EventListenerSet {
  private _eventListeners:  {
    [ key: string ]: {
      [ event: string ]: (e: Event) => void
    }
  } = {}
  constructor() {
    if (document) {
      KUT_SUPPORTED_EVENTS.forEach((event: string) => {
        document.addEventListener(event, (e: Event) => {
          let kutId = (e.target as HTMLElement).getAttribute
            && (e.target as HTMLElement).getAttribute(KUT_ID)
          while (kutId) {
            const eventListener: (e: Event) => void =
              this._eventListeners[kutId] && this._eventListeners[kutId][event]
            if (eventListener) {
              eventListener(e)
            }
            kutId = getParentID(kutId)
          }
        })
      })
    }
  }
  get(kutId: string, event: string): Function {
    return this._eventListeners[kutId][event]
  }
  set(kutId: string, event: string, eventListener: (e: Event) => void): void {
    if (!this._eventListeners[kutId]) {
      this._eventListeners[kutId] = {}
    }
    this._eventListeners[kutId][event] = eventListener
  }
  del(kutId: string, event: string): void {
    if (this._eventListeners[kutId]) {
      delete this._eventListeners[kutId][event]
    }
  }
  delAll(kutId: string): void {
    delete this._eventListeners[kutId]
  }
}

export const eventListenerSet: EventListenerSet = new EventListenerSet()