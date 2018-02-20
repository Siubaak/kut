import { KutElement, KutChild, KutProps } from './element'
import { instantiate } from './renderer'
import { Component } from './component'
import { Patches, diff, patch } from './diff'
import { KUT_ID, KUT_SUPPORTED_EVENT_HANDLERS, CUT_ON_REGEX } from './constant'
import { setEventListener, removeEventListener, removeAllEventListener } from './event'
import { getNode, getClassString, getStyleString } from './util'

export type KutInstance = TextInstance | DOMInstance | ComponentInstance

/**
 * 空节点和文本节点实例类
 */
export class TextInstance {
  kutId: string
  index: number = 0
  private _element: number | string
  constructor(element: KutChild) {
    this._element = '' + element as (number | string)
  }
  get key(): string {
    return '' + this.index
  }
  get node(): HTMLElement {
    return getNode(this.kutId)
  }
  mount(kutId: string): string {
    this.kutId = kutId
    return `<span ${KUT_ID}="${kutId}" >${this._element}</span>`
  }
  shouldReceive(nextElement: KutChild): boolean {
    return (typeof nextElement === 'number' || typeof nextElement === 'string')
  }
  update(nextElement: KutChild): void {
    // 使用==以判断undefined和null
    nextElement = nextElement == null ? this._element : '' + (nextElement as (number | string))
    if (this._element !== nextElement) {
      this._element = nextElement
      this.node.innerText = this._element as string
    }
  }
  unmount() {
    removeAllEventListener(this.kutId)
    getNode(this.kutId).remove()
    delete this.kutId
    delete this.index
    delete this._element
  }
}

/**
 * DOM节点实例类，如div等
 */
export class DOMInstance {
  kutId: string
  index: number = 0
  private _element: KutElement
  private _childInstances: KutInstance[]
  constructor(element: KutChild) {
    this._element = element as KutElement
  }
  get key(): string {
    return this._element.key != null
      ? 'k_' + this._element.key
      : '' + this.index
  }
  get node(): HTMLElement {
    return getNode(this.kutId)
  }
  mount(kutId: string): string {
    this.kutId = kutId
    let markup = `<${this._element.type} ${KUT_ID}="${kutId}" `
    if (this._element.key != null) {
      markup += `key="${this._element.key}" `
    }
    const props = this._element.props
    for (let prop in props) {
      if (prop === 'children') {
      } else if (prop === 'className') {
        markup += `class="${getClassString(props.className)}" `
      } else if (prop === 'style') {
        markup += `style="${getStyleString(props.style)}" `
      } else if (
        KUT_SUPPORTED_EVENT_HANDLERS[prop.toLowerCase()]
        && typeof props[prop] === 'function'
      ) {
        setEventListener(
          kutId,
          prop.toLowerCase().replace(CUT_ON_REGEX, ''),
          props[prop],
        )
      } else {
        markup += `${prop}="${props[prop]}" `
      }
    }
    markup += '>'
    this._childInstances = []
    this._element.props.children.forEach((child: KutChild, index: number) => {
      const instance: KutInstance = instantiate(child)
      instance.index = index
      markup += instance.mount(`${kutId}:${instance.key}`)
      this._childInstances.push(instance)
    })
    markup += `</${this._element.type}>`
    return markup
  }
  shouldReceive(nextElement: KutChild): boolean {
    return typeof nextElement === 'object'
      && nextElement.type === this._element.type
      && nextElement.key === this._element.key
  }
  update(nextElement: KutChild): void {
    // 使用==以判断undefined和null
    nextElement = nextElement == null ? this._element : (nextElement as KutElement)
    const node = getNode(this.kutId)
    const prevProps = this._element.props
    const nextProps = nextElement.props
    for (let prop in nextProps) {
      if (prop === 'children') {
        continue
      } else if (prop === 'className') {
        node.className = getClassString(nextProps.className)
      } else if (prop === 'style') {
        node.style.cssText = getStyleString(nextProps.style)
      } else if (prop === 'value') {
        (node as any).value = nextProps.value
      } else if (
        KUT_SUPPORTED_EVENT_HANDLERS[prop.toLowerCase()]
        && typeof nextProps[prop] === 'function'
      ) {
        setEventListener(
          this.kutId,
          prop.toLowerCase().replace(CUT_ON_REGEX, ''),
          nextProps[prop],
        )
      } else {
        node.setAttribute(prop, nextProps[prop])
      }
    }
    for (let prop in prevProps) {
      if (nextProps[prop] == null) {
        if (
          KUT_SUPPORTED_EVENT_HANDLERS[prop.toLowerCase()]
          && typeof nextProps[prop] === 'function'
        ) {
          removeEventListener(
            this.kutId,
            prop.toLowerCase().replace(CUT_ON_REGEX, ''),
          )
        } else {
          node.removeAttribute(prop)
        }
      }
    }
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
      patch(this.kutId, patches)
    }
    this._element = nextElement
  }
  unmount() {
    removeAllEventListener(this.kutId)
    this._childInstances.forEach((child: KutInstance) => child.unmount())
    getNode(this.kutId).remove()
    delete this.kutId
    delete this.index
    delete this._element
    delete this._childInstances
  }
}

/**
 * 自定义组件实例类
 */
export class ComponentInstance {
  kutId: string
  index: number = 0
  private _element: KutElement
  private _component: Component
  private _renderedInstance: KutInstance
  constructor(element: KutChild) {
    this._element = element as KutElement
  }
  get key(): string {
    return this._element.key != null
      ? 'k_' + this._element.key
      : '' + this.index
  }
  get node(): HTMLElement {
    return getNode(this.kutId)
  }
  mount(kutId: string): string {
    this.kutId = kutId
    const type: string | typeof Component = (this._element as KutElement).type
    const ComponentConstructor: typeof Component = type as typeof Component
    this._component = new ComponentConstructor(this._element.props)
    this._component.componentWillMount()
    this._component.update = this.update.bind(this)
    const renderedElement: KutElement = this._component.render()
    this._renderedInstance = instantiate(renderedElement)
    const markup = this._renderedInstance.mount(kutId)
    this._component.componentDidMount()
    return markup
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
    }
    this._element = nextElement
  }
  unmount() {
    this._component.componentWillUnmount()
    removeAllEventListener(this.kutId)
    this._renderedInstance.unmount()
    getNode(this.kutId).remove()
    delete this.kutId
    delete this.index
    delete this._element
    delete this._component
    delete this._renderedInstance
  }
}

