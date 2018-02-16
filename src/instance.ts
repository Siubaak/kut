import { KutElement, KutChild } from './element'
import { KUT_SUPPORTED_EVENT_HANDLERS } from './constant'
import { Component } from './component'

export class TextInstance {
  private element: number | string
  private container: HTMLElement
  private node: Text
  constructor(element: number | string, container: HTMLElement) {
    this.element = element
    this.container = container
  }
  mount(): void {
    this.node = document.createTextNode(this.element as string)
    this.container.appendChild(this.node)
  }
  update(newElement: number | string): void {
    if (this.element !== newElement) {
      const oldNode = this.node
      this.element = newElement
      this.node = document.createTextNode(newElement as string)
      this.container.replaceChild(this.node, oldNode)
    }
  }
  unmount() {
    this.container.removeChild(this.node)
  }
}

export class DOMInstance {
  private element: KutElement
  private container: HTMLElement
  private node: HTMLElement
  constructor(element: KutElement, container: HTMLElement) {
    this.element = element
    this.element.instance = this
    this.container = container
  }
  mount(): void {
    this.node = document.createElement(this.element.type as string)
    const props = this.element.props
    if (this.element.key) {
      this.node.setAttribute('key', this.element.key)
    }
    for (let prop in this.element.props) {
      if (prop === 'children') {
      } else if (prop === 'className') {
        this.node.className = props.className
      } else if (prop === 'style') {
        for (let key in props.style) {
          if (
            (this.node.style as any)[key] !== undefined
            && Object.hasOwnProperty.call(props.style, key)
          ) {
            (this.node.style as any)[key] = props.style[key]
          }
        }
      } else if (
        KUT_SUPPORTED_EVENT_HANDLERS[prop.toLowerCase()]
        && typeof props[prop] === 'function'
      ) {
        (this.node as any)[prop.toLowerCase()] = props[prop]
      } else {
        this.node.setAttribute(prop, props[prop])
      }
    }
    props.children.forEach(
      (child: KutChild | KutChild[]) => {
        if (Array.isArray(child)) {
          child.forEach((c: KutChild) => {
            const instance = instantiate(c, this.node)
            instance.mount()
          })
        } else {
          const instance = instantiate(child, this.node)
          instance.mount()
        }
      }
    )
    this.container.appendChild(this.node)
  }
  update(newElement: KutElement): void {
    
  }
  unmount() {
    this.container.removeChild(this.node)
  }
}

export class ComponentInstance {
  private element: KutElement
  private container: HTMLElement
  private component: Component
  constructor(element: KutElement, container: HTMLElement) {
    this.element = element
    this.element.instance = this
    this.container = container
  }
  mount(): void {
    // 构造Component实例
    const type: string | typeof Component = (this.element as KutElement).type
    const ComponentConstructor: typeof Component = type as typeof Component
    this.component = new ComponentConstructor(this.element.props)
    // 保存实例到component实例中
    this.component.instance = this
    // 调用componentWillMount
    this.component.componentWillMount()
    // 进行渲染，返回VDOM树
    const renderElement: KutElement = this.component.render()
    // 实例化VDOM树
    const instance = instantiate(renderElement, this.container)
    // 挂载VDOM到DOM中
    instance.mount()
    // 调用componentDidMount
    this.component.componentDidMount()
  }
  update(newElement: KutElement): void {
    this.component.componentWillUpdate()
    if (this.component.shouldComponentUpdate()) {
      const instance = instantiate(newElement, this.container)
      while(this.container.lastChild) {
        this.container.removeChild(this.container.lastChild)
      }
      // 挂载VDOM到DOM中
      instance.mount()
    }
    this.element = newElement
    this.element.instance = this
    this.component.componentDidUpdate()
  }
}

export function instantiate(element: KutChild, container: HTMLElement) {
  let instance: TextInstance | DOMInstance | ComponentInstance = null
  if (typeof element === 'number' || typeof element === 'string') {
    // 如果是number或string，证明VDOM树到根节点了
    instance = new TextInstance(element as string, container)
  } else if (typeof (element as KutElement).type === 'string') {
    // 如果element.type是string，证明是div、p等内置DOM节点类型
    instance = new DOMInstance(element as KutElement, container)
  } else if (typeof (element as KutElement).type === typeof Component) {
    // 如果element.type是function，证明是Component
    instance = new ComponentInstance(element as KutElement, container)
  }
  return instance
}