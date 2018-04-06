import { KutElement, KutChild } from './element'
import { instantiate } from './renderer'
import { Component } from './component'
import { Patches, diff, patch } from './diff'
import { KUT_ID, KUT_SUPPORTED_EVENT_HANDLERS, CUT_ON_REGEX } from './constant'
import { eventListenerSet } from './event'
import { getNode, getClassString, getStyleString, didMountSet } from './util'
import { reconciler } from './reconciler'

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
    eventListenerSet.delAll(this.kutId)
    this.node.remove()
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
    for (const prop in props) {
      if (prop === 'children') {
      } else if (prop === 'className') {
        markup += `class="${getClassString(props.className)}" `
      } else if (prop === 'style') {
        markup += `style="${getStyleString(props.style)}" `
      } else if (
        KUT_SUPPORTED_EVENT_HANDLERS[prop.toLowerCase()]
        && typeof props[prop] === 'function'
      ) {
        eventListenerSet.set(
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
    // 等挂载完统一返回ref
    if (typeof this._element.ref === 'function') {
      didMountSet.add(() => this._element.ref(this.node))
    }
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
    const node = this.node
    const prevProps = this._element.props
    const nextProps = nextElement.props
    for (const prop in nextProps) {
      if (prop === 'children') {
        continue
      } else if (prop === 'className') {
        const nextClassName: string = getClassString(nextProps.className)
        if (node.className !== nextClassName) {
          node.className = nextClassName
        }
      } else if (prop === 'style') {
        const nextStyle: string = getStyleString(nextProps.style)
        if (node.style.cssText !== nextStyle) {
          node.style.cssText = nextStyle
        }
      } else if (prop === 'value') {
        const nextValue: any = nextProps.value
        if ((node as any).value !== nextValue) {
          ;(node as any).value = nextValue
        }
      } else if (
        KUT_SUPPORTED_EVENT_HANDLERS[prop.toLowerCase()]
        && typeof nextProps[prop] === 'function'
      ) {
        const event: string = prop.toLowerCase().replace(CUT_ON_REGEX, '')
        const prevEventListener = eventListenerSet.get(this.kutId, event)
        const nextEventListener = nextProps[prop]
        if (prevEventListener !== nextEventListener) {
          eventListenerSet.set(this.kutId, event, nextEventListener)
        }
      } else {
        const nextAttr: any = nextProps[prop]
        if (node.getAttribute(prop) !== nextAttr) {
          node.setAttribute(prop, nextAttr)
        }
      }
    }
    for (const prop in prevProps) {
      if (nextProps[prop] == null) {
        if (
          KUT_SUPPORTED_EVENT_HANDLERS[prop.toLowerCase()]
          && typeof nextProps[prop] === 'function'
        ) {
          eventListenerSet.del(
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
      // 最常见情况，均只有一个子节点且不变，直接递归更新
      reconciler.enqueueUpdate(prevChildInstances[0], nextChildren[0])
    } else {
      // 存在多个子节点，进行diff并调用patch更新
      // diff会更新this._childInstances
      const patches: Patches = diff(prevChildInstances, nextChildren)
      patch(this.kutId, patches)
    }
    this._element = nextElement
  }
  unmount() {
    eventListenerSet.delAll(this.kutId)
    this._childInstances.forEach((child: KutInstance) => child.unmount())
    this.node.remove()
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
  private _component: Component
  private _element: KutElement
  private _renderedInstance: KutInstance
  private _skipShouldUpdate = false
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
    if (typeof (this._component as any).componentWillMount === 'function') {
      ;(this._component as any).componentWillMount()
    }
    // 异步更新方法注入，更新完毕后会调用componentDidUpdate方法
    this._component._update = (callback, skipShouldUpdate) => {
      this._skipShouldUpdate = skipShouldUpdate
      reconciler.enqueueUpdate(this, null, callback)
    }
    const renderedElement: KutElement = this._component.render()
    this._renderedInstance = instantiate(renderedElement)
    const markup = this._renderedInstance.mount(kutId)
    // 等挂载完统一调用componentDidMount方法
    if (typeof (this._component as any).componentDidMount === 'function') {
      didMountSet.add((this._component as any).componentDidMount.bind(this._component))
    }
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
    if (
      typeof (this._component as any).componentWillReceiveProps === 'function'
      && this._element !== nextElement
    ) {
      ;(this._component as any).componentWillReceiveProps(nextElement.props)
    }
    const nextProps = this._component.props = nextElement.props
    const nextState = this._component.state
    let shouldUpdate = true
    if (
      typeof (this._component as any).shouldComponentUpdate === 'function'
      && !this._skipShouldUpdate
    ) {
      shouldUpdate = (this._component as any).shouldComponentUpdate(nextProps, nextState)
    }
    if (shouldUpdate) {
      this._skipShouldUpdate = false
      if (typeof (this._component as any).componentWillUpdate === 'function') {
        ;(this._component as any).componentWillUpdate(nextProps, nextState)
      }
      const nextRenderedElement: KutElement = this._component.render()
      let callback
      if (typeof (this._component as any).componentDidUpdate === 'function') {
        callback = (this._component as any).componentDidUpdate.bind(this._component)
      }
      reconciler.enqueueUpdate(this._renderedInstance, nextRenderedElement, callback)
    }
    this._element = nextElement
  }
  unmount() {
    if (typeof (this._component as any).componentWillUnmount === 'function') {
      ;(this._component as any).componentWillUnmount()
    }
    eventListenerSet.delAll(this.kutId)
    this._renderedInstance.unmount()
    this.node.remove()
    delete this.kutId
    delete this.index
    delete this._element
    delete this._component
    delete this._renderedInstance
  }
}

