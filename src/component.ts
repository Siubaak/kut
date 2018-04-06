import { KutProps, KutElement } from './element'

/**
 * Component基类，编写Component件时进行继承
 */
export class Component {
  state: any = {}
  props: KutProps
  static defaultProps: any

  _update = (skipShouldUpdate: boolean) => {}

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
  protected setState(state: any): void {
    this.state = (Object as any).assign({}, this.state, state)
    this._update(false)
  }

  /**
   * setState异步更新，可传入回调函数获取更新后state
   * 强制更新Component，子类中不应进行重写
   * @param callback 回调函数，自动绑定当前上下文
   * @final
   * @protected
   */
  protected forceUpdate(): void {
    this._update(true)
  }

  /**
   * Component渲染函数，返回其包含element
   * @param props 
   */
  render(props: KutProps = this.props): KutElement {
    return null
  }

  // 支持的生命周期函数
  // componentWillMount() {}
  // componentDidMount() {}
  // componentWillReceiveProps(nextProps: KutProps) {}
  // shouldComponentUpdate(nextProps: KutProps, nextState: any) {
  //   return true
  // }
  // componentWillUpdate(nextProps: KutProps, nextState: any) {}
  // componentDidUpdate() {}
  // componentWillUnmount() {}
}
