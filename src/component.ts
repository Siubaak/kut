import { KutProps, KutElement } from './element'
import { ComponentInstance } from './instance'

/**
 * Component基类，编写Component件时进行继承
 */
export class Component {
  state: any
  props: KutProps
  _instance: ComponentInstance

  constructor(props: KutProps) {
    this.props = props
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
    this.state = Object.assign({}, this.state, state)
    this._instance.update(null, this.state)
  }

  /**
   * 强制更新Component
   * @final
   * @protected
   */
  protected forceUpdate(): void {
    this._instance.update(null, this.state)
  }

  /**
   * Component渲染函数，返回其包含element
   * @param props 
   */
  render(props: KutProps = this.props): KutElement {
    return null
  }

  // 一堆生命周期函数
  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps(nextProps: KutProps) {}
  shouldComponentUpdate(nextProps: KutProps, nextState: any) {
    return true
  }
  componentWillUpdate(nextProps: KutProps, nextState: any) {}
  componentDidUpdate() {}
  componentWillUnmount() {}
}
