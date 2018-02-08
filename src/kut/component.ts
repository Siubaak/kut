import { Updater, defaultUpdater } from './updater'

/**
 * Component基类，编写Component件时进行继承
 */
export class Component {
  defaultProps: any
  props: any
  updater: Updater
  isReactComponent = {}

  public constructor(props: any, updater: Updater = defaultUpdater) {
    this.props = props
    // 虽然提供了缺省updater，但render将给Component注入一个可用的updater
    this.updater = updater
  }

  /**
   * 为state创建副本，并以此修改state，应该把state当作不可变对象。
   * state更新是异步的，setState也是异步的。
   * 子类中不应进行override。
   * @param state 
   * @final
   * @protected
   */
  setState(state: any): void {
    this.updater.enqueueSetState(this, state)
  }

  /**
   * 强制更新，此方法会调用componentWillUpdate和componentDidUpdate，
   * 但不会调用shouldComponentUpdate。
   * @final
   * @protected
   */
  forceUpdate(): void {
    this.updater.enqueueForceUpdate(this)
  }
}
