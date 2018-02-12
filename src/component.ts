import { KutProps, KutElement } from './element'

export interface KutUpdater {
  enqueueSetState(instance: Component, state: any): void
  enqueueForceUpdate(instance: Component,): void 
}

const defaultUpdater: KutUpdater = {
  enqueueSetState(instance: Component, state: any): void {},
  enqueueForceUpdate(instance: Component): void {},
}

/**
 * Component基类，编写Component件时进行继承
 */
export class Component {
  protected props: KutProps
  updater: KutUpdater

  constructor(props: KutProps, updater: KutUpdater = defaultUpdater) {
    this.props = props
    // 虽然提供了缺省updater，但render将给Component注入一个可用的updater
    this.updater = updater
  }

  /**
   * 为state创建副本，并以此修改state，应该把state当作不可变对象
   * state更新是异步的，setState也是异步的
   * 子类中不应进行override
   * @param state 
   * @final
   * @protected
   */
  protected setState(state: any): void {
    this.updater.enqueueSetState(this, state)
  }

  /**
   * Component渲染函数，返回其包含element
   * @param props 
   */
  public render(props: KutProps = this.props): KutElement {
    return null
  }
}
