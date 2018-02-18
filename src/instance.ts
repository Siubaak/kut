import { KutElement, KutChild, KutProps } from './element'
import { instantiate } from './renderer'
import { Component } from './component'
import { setProps } from './utils'

export type KutInstance = TextInstance | DOMInstance | ComponentInstance

export class TextInstance {
  private _element: number | string
  private _container: HTMLElement
  private _node: Text
  constructor(element: KutChild) {
    this._element = element as (number | string)
  }
  mount(container: HTMLElement): Text {
    this._container = container
    this._node = document.createTextNode(this._element as string)
    return this._node
  }
  update(nextElement: KutChild): void {
    // 使用==以判断undefined和null
    nextElement = nextElement == null ? this._element : (nextElement as (number | string))
    if (nextElement !== this._element) {
      const prevNode = this._node
      this._node = document.createTextNode(nextElement as string)
      this._container.replaceChild(this._node, prevNode)
    }
    this._element = nextElement
  }
  unmount() {
    this._container.removeChild(this._node)
    this._element = null
    this._container = null
    this._node = null
  }
}

export class DOMInstance {
  private _element: KutElement
  private _container: HTMLElement
  private _node: HTMLElement
  private _childInstances: KutInstance[]
  constructor(element: KutChild) {
    this._element = element as KutElement
  }
  mount(container: HTMLElement): HTMLElement {
    this._childInstances = []
    this._container = container
    this._node = document.createElement(this._element.type as string)
    if (this._element.key) {
      this._node.setAttribute('key', this._element.key)
    }
    setProps(this._node, this._element.props)
    this._element.props.children.forEach((child: KutChild) => {
      const instance: KutInstance = instantiate(child)
      this._childInstances.push(instance)
      const childNode: Text | HTMLElement = instance.mount(this._node)
      this._node.appendChild(childNode)
    })
    return this._node
  }
  update(nextElement: KutChild): void {
    // 使用==以判断undefined和null
    nextElement = nextElement == null ? this._element : (nextElement as KutElement)
    if (
      nextElement.type === this._element.type
      && nextElement.key === this._element.key
    ) {
      setProps(this._node, nextElement.props, this._element.props)
      while(nextElement.props.children.length < this._childInstances.length) {
        this._childInstances[this._childInstances.length - 1].unmount()
        this._childInstances.pop()
      }
      nextElement.props.children.forEach((child: KutChild, index: number) => {
        if (this._childInstances[index]) {
          this._childInstances[index].update(child)
        } else {
          const instance: KutInstance = instantiate(child)
          this._childInstances.push(instance)
          const childNode: Text | HTMLElement = instance.mount(this._node)
          this._node.appendChild(childNode)
        }
      })
    } else {
      const prevNode = this._node
      this._node = this.mount(this._container)
      this._container.replaceChild(this._node, prevNode)
    }
    this._element = nextElement
  }
  unmount() {
    this._container.removeChild(this._node)
    this._element = null
    this._container = null
    this._node = null
    this._childInstances = []
  }
}

export class ComponentInstance {
  private _element: KutElement
  private _container: HTMLElement
  private _node: Text | HTMLElement
  private _component: Component
  private _renderedInstance: KutInstance
  constructor(element: KutChild) {
    this._element = element as KutElement
  }
  mount(container: HTMLElement): Text | HTMLElement {
    this._container = container
    const type: string | typeof Component = (this._element as KutElement).type
    const ComponentConstructor: typeof Component = type as typeof Component
    this._component = new ComponentConstructor(this._element.props)
    this._component.componentWillMount()
    this._component._instance = this
    const renderedElement: KutElement = this._component.render()
    this._renderedInstance = instantiate(renderedElement)
    this._node = this._renderedInstance.mount(this._container)
    this._component.componentDidMount()
    return this._node
  }
  update(nextElement: KutChild, nextState: any = this._component.state): void {
    // 使用==以判断undefined和null
    nextElement = nextElement == null ? this._element : (nextElement as KutElement)
    this._component.props = nextElement.props
    this._component.state = nextState
    if (this._component.shouldComponentUpdate(nextElement.props, nextState)) {
      this._component.componentWillUpdate(nextElement.props, nextState)
      const nextRenderedElement: KutElement = this._component.render()
      if (
        nextElement.type === this._element.type
        && nextElement.key === this._element.key
      ) {
        this._renderedInstance.update(nextRenderedElement)
        this._component.componentDidUpdate()
      } else {
        const prevNode = this._node
        this._renderedInstance = instantiate(nextRenderedElement)
        this._node = this._renderedInstance.mount(this._container)
        this._container.replaceChild(this._node, prevNode)
      }
    }
    this._element = nextElement
  }
  unmount() {
    this._component.componentWillUnmount()
    this._container.removeChild(this._node)
    this._element = null
    this._container = null
    this._node = null
    this._component = null
    this._renderedInstance = null
  }
}

