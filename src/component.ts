import { KutProps, KutElement } from './element'
import { ComponentInstance } from './instance'

/**
 * Component基类，编写Component件时进行继承
 */
export class Component {
  protected state: any
  protected props: KutProps
  instance: ComponentInstance

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
    const renderElement = this.render()
    this.instance.update(renderElement)
  }

  /**
   * Component渲染函数，返回其包含element
   * @param props 
   */
  render(props: KutProps = this.props): KutElement {
    return null
  }

  componentWillMount() {}
  componentDidMount() {}
  componentWillUpdate() {}
  componentDidUpdate() {}
  shouldComponentUpdate() {
    return true
  }
}
