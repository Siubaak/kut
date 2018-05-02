import { Component } from './component'
import { KUT_RESERVED_PROPS } from './constant'
import { is } from './util'

export type KutChild = number | string | KutElement

export interface KutProps {
  children: KutChild[]
  [prop: string]: any
}

export interface KutElement {
  type: string | typeof Component
  key: string
  ref: (node: HTMLElement) => void
  props: KutProps
}

/**
 * 创建element并返回该element，即VDOM节点
 * @param type 类型，如div或自定义组件
 * @param config 配置，如key、style等
 * @param children 子节点数组
 */
export function createElement(
  type: string | typeof Component,
  config: any,
  ...children: (KutChild | KutChild[])[],
): KutElement {
  children = children.length ? [].concat(...children) : ['']
  const props: KutProps = { children: children as KutChild[] }
  let key: string = null
  let ref: (node: HTMLElement) => void = null
  if (config) {
    if (config.key != null) {
      key = ('' + (config.key as string)).replace(/:/g, '_')
    }
    if (config.ref && is.function(config.ref)) {
      ref = config.ref
    }
    for (const prop in config) {
      if (
        Object.hasOwnProperty.call(config, prop)
        && !KUT_RESERVED_PROPS[prop]
      ) {
        props[prop] = config[prop]
      }
    }
    if (type && (type as typeof Component).defaultProps) {
      const defaultProps: any = (type as typeof Component).defaultProps
      for (const prop in defaultProps) {
        if (
          Object.hasOwnProperty.call(defaultProps, prop)
          && !KUT_RESERVED_PROPS[prop]
          && (is.undefined(props[prop]) || is.null(props[prop]))
        ) {
          props[prop] = defaultProps[prop]
        }
      }
    }
  }
  return { type, key, ref, props }
}
