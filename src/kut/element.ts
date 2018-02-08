import { KutElement } from './interface'

const RESERVED_PROPS: string[] = [ 'key', 'ref' ]
const ELEMENT_TYPE =
  (
    typeof Symbol === 'function'
    && Symbol.for
    && Symbol.for('kut.element')
  )
  || 0xeac7

interface Factory {
  (config: any, ...children: KutElement[]): KutElement
  type: any
}

export function createElement(type: any, config: any, ...children: KutElement[]): KutElement {
  const props: any = {}
  let key: string = null
  let ref: HTMLElement = null
  if (config !== null) {
    if (config.ref !== undefined) {
      ref = config.ref as HTMLElement
    }
    if (config.key !== undefined) {
      key = '' + (config.key as string)
    }

    for (let prop in config) {
      if (
        Object.hasOwnProperty.call(config, prop)
        && !~RESERVED_PROPS.indexOf(prop)
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
    __typeof: ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
  }
}

export function createFactory(type: any): Factory {
  const factory: Factory = createElement.bind(null, type)
  factory.type = type
  return factory
}

export function cloneAndReplaceKey(oldElement: KutElement, newKey: string): KutElement {
  return {
    __typeof: ELEMENT_TYPE,
    type: oldElement.type,
    key: newKey,
    ref: oldElement.ref,
    props: oldElement.props,
  }
}

export function cloneElement(element: KutElement, config: any, ...children: KutElement[]): KutElement {
  const props: any = Object.assign({}, element.props)
  const type: any = element.type
  let key: string = element.key
  let ref: HTMLElement = element.ref
  if (config !== null) {
    if (config.ref !== undefined) {
      ref = config.ref as HTMLElement
    }
    if (config.key !== undefined) {
      key = '' + (config.key as string)
    }

    let defaultProps: any
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps
    }
    for (let prop in config) {
      if (
        Object.hasOwnProperty.call(config, prop)
        && !~RESERVED_PROPS.indexOf(prop)
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
    __typeof: ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
  }
}

export function isValidElement(element: KutElement): boolean {
  return (
    typeof element === 'object'
    && element !== null
    && element.__typeof === ELEMENT_TYPE
  )
}
