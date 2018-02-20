import { Component } from './component'
import { KUT_RESERVED_PROPS } from './constant'

export type KutChild = number | string | KutElement

export interface KutProps {
  children: KutChild[]
  [prop: string]: any
}

export interface KutElement {
  type: string | typeof Component
  key: string
  ref: (node: Text | HTMLElement) => void
  props: KutProps
}

/**
 * 创建element并返回该element，即VDOM节点
 * @param type 类型，如div或自定义组件
 * @param config 配置，如key、ref、style等
 * @param children 子节点数组
 */
export function createElement(
  type: string | typeof Component,
  config: any,
  ...rawChildren: (KutChild | KutChild[])[],
): KutElement {
  const children: KutChild[] =
    rawChildren.length
    ? [].concat(...rawChildren)
    : ['']
  const props: KutProps = { children }
  let key: string = null
  let ref: (node: Text | HTMLElement) => void = null
  if (config) {
    if (config.key != null) {
      key = ('' + (config.key as string)).replace(/:/g, '.')
    }
    if (typeof config.ref === 'function') {
      ref = config.ref
    }
    for (let prop in config) {
      if (
        Object.hasOwnProperty.call(config, prop)
        && !KUT_RESERVED_PROPS[prop]
      ) {
        props[prop] = config[prop]
      }
    }
  }
  return { type, key, ref, props }
}
