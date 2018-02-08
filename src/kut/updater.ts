import { Component } from './component'

export interface Updater {
  enqueueSetState(
    instance: Component,
    state: any,
  ): void
  enqueueForceUpdate(
    instance: Component,
  ): void 
}

/**
 * 缺省updater
 */
export const defaultUpdater: Updater = {
  enqueueSetState(
    instance: Component,
    state: any,
  ): void {},
  enqueueForceUpdate(
    instance: Component,
  ): void {},
}

