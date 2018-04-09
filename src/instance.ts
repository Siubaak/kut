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

    // 拼接头部
    let markup = `<${this._element.type} ${KUT_ID}="${kutId}" `
    if (this._element.key != null) {
      markup += `key="${this._element.key}" `
    }
    const props = this._element.props
    for (const prop in props) {
      if (prop === 'children') {
        // 如果是children，不进行操作
        continue
      } else if (prop === 'className') {
        // 如果是className，调用getClassString进行转换
        markup += `class="${getClassString(props.className)}" `
      } else if (prop === 'style') {
        // 如果是style，调用getStyleString进行转换
        markup += `style="${getStyleString(props.style)}" `
      } else if (
        KUT_SUPPORTED_EVENT_HANDLERS[prop.toLowerCase()]
        && typeof props[prop] === 'function'
      ) {
        // 如果是事件监听函数，则进行委托
        eventListenerSet.set(
          kutId,
          prop.toLowerCase().replace(CUT_ON_REGEX, ''),
          props[prop],
        )
      } else {
        // 其他props直接赋值
        markup += `${prop}="${props[prop]}" `
      }
    }
    markup += '>'

    // 拼接内部
    this._childInstances = []
    this._element.props.children.forEach((child: KutChild, index: number) => {
      const instance: KutInstance = instantiate(child)
      instance.index = index
      markup += instance.mount(`${kutId}:${instance.key}`)
      this._childInstances.push(instance)
    })

    // 拼接尾部
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

    // 更新属性
    for (const prop in nextProps) {
      if (prop === 'children') {
        // 如果是children，不进行操作
        continue
      } else if (prop === 'className') {
        const nextClassName: string = getClassString(nextProps.className)
        if (node.className !== nextClassName) {
          // 如果是className，调用getClassString进行转换
          // 若不同则更新
          node.className = nextClassName
        }
      } else if (prop === 'style') {
        const nextStyle: string = getStyleString(nextProps.style)
        if (node.style.cssText !== nextStyle) {
          // 如果是style，调用getStyleString进行转换
          // 若不同则更新
          node.style.cssText = nextStyle
        }
      } else if (prop === 'value') {
        const nextValue: any = nextProps.value
        if ((node as any).value !== nextValue) {
          // 如果是value，需特殊对待，因为setAttribute只会改变初始值
          // 只有node.value才是input、textarea等的真实值
          // 若不同则更新
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
          // 如果是事件监听函数，则进行委托
          // 若不同则更新
          eventListenerSet.set(this.kutId, event, nextEventListener)
        }
      } else {
        const nextAttr: any = nextProps[prop]
        if (node.getAttribute(prop) !== nextAttr) {
          // 其他props直接判断，若不同则更新
          node.setAttribute(prop, nextAttr)
        }
      }
    }

    // 去除多余属性
    for (const prop in prevProps) {
      if (nextProps[prop] == null) {
        if (
          KUT_SUPPORTED_EVENT_HANDLERS[prop.toLowerCase()]
          && typeof nextProps[prop] === 'function'
        ) {
          // 去除事件委托
          eventListenerSet.del(
            this.kutId,
            prop.toLowerCase().replace(CUT_ON_REGEX, ''),
          )
        } else {
          // 去除属性
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

  private _skipShouldUpdate: boolean = false
  private _stateQueue: {
    partialState: any,
    callback: (nextState: any) => void,
  }[] = []

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
  mount(kutId: string, context?: any): string {
    this.kutId = kutId
    
    const ComponentSubclass = ((this._element as KutElement).type as typeof Component)
    this._component = new ComponentSubclass(this._element.props, context)

    // 异步更新方法注入，更新完毕后会调用componentDidUpdate方法
    this._component._updater = {
      enqueueSetState: (partialState: any, callback: (nextState: any) => void) => {
        this._stateQueue.push({ partialState, callback })
        reconciler.enqueueUpdate(this)
      },
      enqueueForceUpdate: (callback: (nextState: any) => void) => {
        this._skipShouldUpdate = true
        this._stateQueue.push({ partialState: null, callback })
        reconciler.enqueueUpdate(this)
      },
    }

    // 调用static getDerivedStateFromProps
    if (typeof ComponentSubclass.getDerivedStateFromProps === 'function') {
      this._component.state = (Object as any).assign(
        {},
        this._component.state,
        ComponentSubclass.getDerivedStateFromProps(this._element.props, this._component.state),
      )
    }

    // 调用render进行渲染
    const renderedElement: KutElement = this._component.render()
    this._renderedInstance = instantiate(renderedElement)
    const markup = this._renderedInstance.mount(kutId)

    // 等挂载完统一调用componentDidMount方法
    if (typeof this._component.componentDidMount === 'function') {
      didMountSet.add(this._component.componentDidMount.bind(this._component))
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

    // 保存旧props和state
    const prevProps = this._component.props
    const prevState = this._component.state

    // 更新props和state
    if (this._element !== nextElement) {
      // 如果不同，证明是父组件触发更新，传入props，调用static getDerivedStateFromProps
      const ComponentSubclass =((this._element as KutElement).type as typeof Component)
      if (typeof ComponentSubclass.getDerivedStateFromProps === 'function') {
        this._component.state = (Object as any).assign(
          {},
          this._component.state,
          ComponentSubclass.getDerivedStateFromProps(nextElement.props, prevState),
        )
      }
    }
    // 合并state
    while (this._stateQueue.length) {
      const state = this._stateQueue.shift()
      let { partialState, callback } = state
      if (typeof partialState === 'function') {
        partialState = partialState(this._component.state)
      }
      if (typeof partialState === 'object') {
        this._component.state = (Object as any).assign(
          {},
          this._component.state,
          partialState,
        )
        if (typeof callback === 'function') {
          callback(this._component.state)
        }
      }
    }

    const nextProps = this._component.props = nextElement.props
    const nextState = this._component.state

    // 判断是否需要触发更新
    let shouldUpdate = true
    if (
      typeof this._component.shouldComponentUpdate === 'function'
      && !this._skipShouldUpdate
    ) {
      shouldUpdate = this._component.shouldComponentUpdate(nextProps, nextState, null)
    }
    
    if (shouldUpdate) {
      // 触发更新
      this._skipShouldUpdate = false
      
      let snapshot: any
      if (typeof this._component.getSnapshotBeforeUpdate === 'function') {
        snapshot = this._component.getSnapshotBeforeUpdate(prevProps, prevState)
      }

      const nextRenderedElement: KutElement = this._component.render()
      let didUpdate: () => void
      if (typeof this._component.componentDidUpdate === 'function') {
        didUpdate = () => this._component.componentDidUpdate(prevProps, prevState, snapshot)
      }

      reconciler.enqueueUpdate(this._renderedInstance, nextRenderedElement, didUpdate)
    }

    this._element = nextElement
  }
  unmount() {
    if (typeof this._component.componentWillUnmount === 'function') {
      this._component.componentWillUnmount()
    }
    eventListenerSet.delAll(this.kutId)
    this._renderedInstance.unmount()
    this.node.remove()
    delete this.kutId
    delete this.index
    delete this._element
    delete this._component
    delete this._renderedInstance
    delete this._skipShouldUpdate
  }
}

