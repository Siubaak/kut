import { KutElement, KutChild, KutProps } from './element'
import { instantiate } from './renderer'
import { Component } from './component'
import { KUT_SUPPORTED_EVENT_HANDLERS } from './constant'
import { Patches, diff, patch } from './diff'

export type KutInstance = TextInstance | DOMInstance | ComponentInstance

/**
 * 空节点和文本节点实例类
 */
export class TextInstance {
  _index: number = 0
  _node: Text
  private _element: number | string
  private _container: HTMLElement
  constructor(element: KutChild) {
    this._element = element as (number | string)
  }
  get key(): string {
    return '_index_' + this._index
  }
  mount(container: HTMLElement): Text {
    this._container = container
    this._node = document.createTextNode(this._element as string)
    return this._node
  }
  shouldReceive(nextElement: KutChild): boolean {
    return (typeof nextElement === 'number' || typeof nextElement === 'string')
      && ('' + nextElement) === ('' + this._element)
  }
  update(nextElement: KutChild): void {
    // 使用==以判断undefined和null
    nextElement = nextElement == null ? this._element : (nextElement as (number | string))
    this._element = nextElement
  }
  unmount() {
    this._container.removeChild(this._node)
    this._container = null
    this._node = null
    this._index = null
  }
}

function setProps(
  node: HTMLElement,
  props: KutProps,
  comparedProps?: KutProps
): void {
  for (let prop in props) {
    if (prop === 'children') {
      continue
    } else if (
      prop === 'className'
      && (!comparedProps || comparedProps.className !== props.className)
    ) {
      if (typeof props.className === 'object') {
        node.className =
          Object.keys(props.className)
            .filter(cls => props.className[cls])
            .join(' ')
      } else if (Array.isArray(props.className)) {
        node.className = props.className.join(' ')
      } else {
        node.className = props.className.toString()
      }
    } else if (
      prop === 'style'
      && (!comparedProps || comparedProps.style !== props.style)
    ) {
      node.style.cssText = ''
      if (typeof props.style === 'object') {
        for (let key in props.style) {
          if (
            (node.style as any)[key] !== undefined
            && Object.hasOwnProperty.call(props.style, key)
          ) {
            (node.style as any)[key] = props.style[key]
          }
        }
      } else {
        node.setAttribute('style', props.style.toString())
      }
    } else if (
      prop === 'value'
      && (!comparedProps || comparedProps.value !== props.value)
    ) {
      (node as any).value = props.value
    } else if (
      KUT_SUPPORTED_EVENT_HANDLERS[prop.toLowerCase()]
      && typeof props[prop] === 'function'
      && (!comparedProps || comparedProps[prop] !== props[prop])
    ) {
      (node as any)[prop.toLowerCase()] = props[prop]
    } else if (!comparedProps || comparedProps[prop] !== props[prop]) {
      node.setAttribute(prop, props[prop])
    }
  }
}

/**
 * DOM节点实例类，如div等
 */
export class DOMInstance {
  _index: number = 0
  _node: HTMLElement
  private _element: KutElement
  private _container: HTMLElement
  private _childInstances: KutInstance[]
  constructor(element: KutChild) {
    this._element = element as KutElement
  }
  get key(): string {
    return this._element.key != null
      ? '_key_' + this._element.key
      : '_index_' + this._index
  }
  mount(container: HTMLElement): HTMLElement {
    this._childInstances = []
    this._container = container
    this._node = document.createElement(this._element.type as string)
    if (this._element.key != null) {
      this._node.setAttribute('key', this._element.key)
    }
    if (typeof this._element.ref === 'function') {
      this._element.ref(this._node)
    }
    setProps(this._node, this._element.props)
    this._element.props.children.forEach((child: KutChild, index: number) => {
      const instance: KutInstance = instantiate(child)
      instance._index = index
      this._childInstances.push(instance)
      const childNode: Text | HTMLElement = instance.mount(this._node)
      this._node.appendChild(childNode)
    })
    return this._node
  }
  shouldReceive(nextElement: KutChild): boolean {
    return typeof nextElement === 'object'
      && nextElement.type === this._element.type
      && nextElement.key === this._element.key
  }
  update(nextElement: KutChild): void {
    // 使用==以判断undefined和null
    nextElement = nextElement == null ? this._element : (nextElement as KutElement)
    setProps(this._node, nextElement.props, this._element.props)
    const prevChildInstances = this._childInstances
    const nextChildren = nextElement.props.children
    // 更新子节点
    if (
      prevChildInstances.length === 1
      && nextChildren.length === 1
      && prevChildInstances[0].shouldReceive(nextChildren[0])
    ) {
      // 最常见情况，均只有一个子节点，直接递归更新
      prevChildInstances[0].update(nextChildren[0])
    } else {
      // 存在多个子节点，进行diff并调用patch更新
      // diff会更新this._childInstances
      const patches: Patches = diff(prevChildInstances, nextChildren)
      patch(this._node, patches)
    }
    if (typeof nextElement.ref === 'function') {
      nextElement.ref(this._node)
    }
    this._element = nextElement
  }
  unmount() {
    this._container.removeChild(this._node)
    this._container = null
    this._node = null
    this._index = null
    this._childInstances = []
  }
}

/**
 * 自定义组件实例类
 */
export class ComponentInstance {
  _index: number = 0
  _node: Text | HTMLElement
  private _element: KutElement
  private _container: HTMLElement
  private _component: Component
  private _renderedInstance: KutInstance
  constructor(element: KutChild) {
    this._element = element as KutElement
  }
  get key(): string {
    return this._element.key != null
      ? '_key_' + this._element.key
      : '_index_' + this._index
  }
  mount(container: HTMLElement): Text | HTMLElement {
    this._container = container
    const type: string | typeof Component = (this._element as KutElement).type
    const ComponentConstructor: typeof Component = type as typeof Component
    this._component = new ComponentConstructor(this._element.props)
    this._component.componentWillMount()
    this._component.update = this.update.bind(this)
    const renderedElement: KutElement = this._component.render()
    this._renderedInstance = instantiate(renderedElement)
    this._node = this._renderedInstance.mount(this._container)
    if (typeof this._element.ref === 'function') {
      this._element.ref(this._node)
    }
    this._component.componentDidMount()
    return this._node
  }
  shouldReceive(nextElement: KutChild): boolean {
    return typeof nextElement === 'object'
      && nextElement.type === this._element.type
      && nextElement.key === this._element.key
  }
  update(nextElement: KutChild, nextState: any = this._component.state): void {
    // 使用==以判断undefined和null
    nextElement = nextElement == null ? this._element : (nextElement as KutElement)
    this._component.props = nextElement.props
    this._component.state = nextState
    if (this._component.shouldComponentUpdate(nextElement.props, nextState)) {
      this._component.componentWillUpdate(nextElement.props, nextState)
      const nextRenderedElement: KutElement = this._component.render()
      this._renderedInstance.update(nextRenderedElement)
      this._component.componentDidUpdate()
      if (typeof nextElement.ref === 'function') {
        nextElement.ref(this._node)
      }
    }
    this._element = nextElement
  }
  unmount() {
    this._component.componentWillUnmount()
    this._container.removeChild(this._node)
    this._container = null
    this._node = null
    this._index = null
    this._component = null
    this._renderedInstance = null
  }
}

