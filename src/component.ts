import { KutProps, KutElement, KutChild } from './element'
import { assign } from './util'

/**
 * Component基类，编写Component件时进行继承
 */
export class Component {
  state: any
  props: KutProps
  static defaultProps: KutProps
  update: (nextElement: KutChild, nextState?: any) => void

  constructor(props: KutProps) {
    this.state = {}
    this.props = props
    this.update = (nextElement: KutChild, nextState?: any) => {}
  }

  /**
   * 为state创建副本，并以此修改state，应该把state当作不可变对象
   * 子类中不应进行override
   * @param state 
   * @final
   * @protected
   */
  protected setState(state: any): void {
    this.state = assign({}, this.state, state)
    this.update(null, this.state)
  }

  /**
   * 强制更新Component
   * @final
   * @protected
   */
  protected forceUpdate(): void {
    this.update(null, this.state)
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
  // componentWillReceiveProps(nextProps: KutProps) {}
  shouldComponentUpdate(nextProps: KutProps, nextState: any) {
    return true
  }
  componentWillUpdate(nextProps: KutProps, nextState: any) {}
  componentDidUpdate() {}
  componentWillUnmount() {}
}
