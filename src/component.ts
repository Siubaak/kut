import { KutProps, KutElement } from './element'

/**
 * Component基类，编写Component件时进行继承
 */
export class Component {
  state: any = {}
  props: KutProps
  static defaultProps: any

  _updater = {
    enqueueSetState: (partialState: any, callback: () => void) => {},
    enqueueForceUpdate: (callback: () => void) => {},
  }

  constructor(props: KutProps) {
    this.props = props
  }

  /**
   * setState异步更新，可传入回调函数获取更新后state
   * 为state创建副本，并以此修改state，应该把state当作不可变对象
   * 子类中不应进行重写
   * @param state 需要修改的state
   * @param callback 回调函数，自动绑定当前上下文
   * @final
   * @protected
   */
  protected setState(partialState: any, callback?: () => void): void {
    this._updater.enqueueSetState(partialState, callback)
  }

  /**
   * setState异步更新，可传入回调函数获取更新后state
   * 强制更新Component，子类中不应进行重写
   * @param callback 回调函数，自动绑定当前上下文
   * @final
   * @protected
   */
  protected forceUpdate(callback?: () => void): void {
    this._updater.enqueueForceUpdate(callback)
  }

  /**
   * Component渲染函数，返回其包含element
   * @param props 
   */
  render(props: KutProps = this.props): KutElement {
    return null
  }

  /**
   * 从props导出state，只在组件挂载和新props传入时调用
   * setState和forceUpdate不触发
   * @param nextProps 新props
   * @param prevState 旧state
   */
  static getDerivedStateFromProps?(nextProps: KutProps, prevState: any): void

  /**
   * 组件挂载完毕钩子方法
   */
  componentDidMount?(): void

  /**
   * 控制组件是否更新，setState和父节点更新触发的更新将调用
   * forceUpdate将跳过判断直接强制更新
   * @param nextProps 新props
   * @param nextState 新state
   * @return {boolean}
   */
  shouldComponentUpdate?(nextProps: KutProps, nextState: any): boolean

  /**
   * 组件更新前获取快照，返回值任意，将作为componentDidUpdate第三个参数传入
   * @param prevProps 旧props
   * @param prevState 旧state
   * @return {any}
   */
  getSnapshotBeforeUpdate?(prevProps: KutProps, prevState: any): any

  /**
   * 组件更新完毕钩子方法
   * @param prevProps 旧props
   * @param prevState 旧state
   * @param snapshot getSnapshotBeforeUpdate返回值
   */
  componentDidUpdate?(prevProps: KutProps, prevState: any, snapshot: any): void

  /**
   * 组件卸载前钩子方法
   */
  componentWillUnmount?(): void
}
