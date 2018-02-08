import { KUT_ELEMENT_TYPE, KUT_RESERVED_PROPS } from './constant'
import { Component } from './component'

export interface Element {
  __typeof: Symbol | number
  type: string | Component
  key: string
  ref: string
  props: any
}

/**
 * 创建element并返回该element
 * @param type 
 * @param config 
 * @param children 
 */
export function createElement(type: any, config: any, ...children: Element[]): Element {
  const props: any = {}
  let key: string = null
  let ref: string = null
  if (config !== null) {
    if (config.ref !== undefined) {
      ref = '' + (config.ref as string)
    }
    if (config.key !== undefined) {
      key = '' + (config.key as string)
    }

    for (let prop in config) {
      if (
        Object.hasOwnProperty.call(config, prop)
        && !~KUT_RESERVED_PROPS.indexOf(prop)
      ) {
        props[prop] = config[prop]
      }
    }
  }
  if (children.length > 0) {
    props.children = children
  }
  if (type && type.defaultProps) {
    for (let prop in type.defaultProps) {
      if (props[prop] === undefined) {
        props[prop] = type.defaultProps[prop]
      }
    }
  }
  return {
    __typeof: KUT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
  }
}

interface Factory {
  (config: any, ...children: Element[]): Element
  type: any
}

/**
 * 创建对应type的element工厂函数
 * @param type 
 */
export function createFactory(type: any): Factory {
  const factory: Factory = createElement.bind(null, type)
  factory.type = type
  return factory
}

/**
 * 替换element的key
 * @param oldElement 
 * @param newKey 
 */
export function cloneAndReplaceKey(oldElement: Element, newKey: string): Element {
  return {
    __typeof: KUT_ELEMENT_TYPE,
    type: oldElement.type,
    key: newKey,
    ref: oldElement.ref,
    props: oldElement.props,
  }
}

/**
 * 克隆一个新的element并返回该element
 * @param element 
 * @param config 
 * @param children 
 */
export function cloneElement(element: Element, config: any, ...children: Element[]): Element {
  const props: any = Object.assign({}, element.props)
  const type: string | Component = element.type
  let key: string = element.key
  let ref: string = element.ref
  if (config !== null) {
    if (config.ref !== undefined) {
      ref = '' + (config.ref as string)
    }
    if (config.key !== undefined) {
      key = '' + (config.key as string)
    }

    let defaultProps: any
    if (element.type && (element.type as Component).defaultProps) {
      defaultProps = (element.type as Component).defaultProps
    }
    for (let prop in config) {
      if (
        Object.hasOwnProperty.call(config, prop)
        && !~KUT_RESERVED_PROPS.indexOf(prop)
      ) {
        if (
          config[prop] === undefined
          && defaultProps[prop] !== undefined
        ) {
          props[prop] = defaultProps[prop]
        } else {
          props[prop] = config[prop]
        }
      }
    }
  }
  if (children.length > 0) {
    props.children = children
  }
  return {
    __typeof: KUT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
  }
}

/**
 * 验证该element是否为Kut有效element
 * @param element 
 */
export function isValidElement(element: Element): boolean {
  return (
    typeof element === 'object'
    && element !== null
    && element.__typeof === KUT_ELEMENT_TYPE
  )
}
