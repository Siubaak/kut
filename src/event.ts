import { KUT_ID, KUT_SUPPORTED_EVENTS } from './constant'
import { getParentID } from './util'

const eventHanlders: {
  [ key: string ]: {
    [ event: string ]: (e: Event) => void
  }
} = {}

if (document) {
  KUT_SUPPORTED_EVENTS.forEach((event: string) => {
    document.addEventListener(event, (e: Event) => {
      let kutId = (e.target as HTMLElement).getAttribute
        && (e.target as HTMLElement).getAttribute(KUT_ID)
      while (kutId) {
        const eventHanlder: (e: Event) => void =
          eventHanlders[kutId] && eventHanlders[kutId][event]
        if (eventHanlder) {
          eventHanlder(e)
        }
        kutId = getParentID(kutId)
      }
    })
  })
}

export function setEventListener(
  kutId: string,
  event: string,
  eventHanlder: (e: Event) => void,
): void {
  if (!eventHanlders[kutId]) {
    eventHanlders[kutId] = {}
  }
  eventHanlders[kutId][event] = eventHanlder
}

export function removeEventListener(
  kutId: string,
  event: string,
): void {
  if (eventHanlders[kutId]) {
    delete eventHanlders[kutId][event]
  }
}

export function removeAllEventListener(
  kutId: string,
): void {
  delete eventHanlders[kutId]
}
