import { Component } from './component'
import { KUT_RESERVED_PROPS } from './constant'
import { TextInstance, DOMInstance, ComponentInstance } from './instance'

export type KutChild = number | string | KutElement

export interface KutProps {
  children: (KutChild | KutChild[])[]
  [prop: string]: any
}

export interface KutElement {
  type: string | typeof Component
  key: string
  props: KutProps
  instance: TextInstance | DOMInstance | ComponentInstance
}

/**
 * 创建element并返回该element，即VDOM节点
 * @param type 
 * @param config 
 * @param children 
 */
export function createElement(
  type: string | typeof Component,
  config: any,
  ...children: (KutChild | KutChild[])[],
): KutElement {
  const props: KutProps = { children }
  let key: string = null
  if (config) {
    if (config.key !== undefined) {
      key = '' + (config.key as string)
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
  return { type, key, props, instance: null }
}
