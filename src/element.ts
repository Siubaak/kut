import { Component } from './component'

const KUT_RESERVED_PROPS: string[] = [ 'key' ]

export interface KutProps {
  children: (number | string | KutElement)[]
  [prop: string]: any
}

export interface KutElement {
  type: string | typeof Component
  key: string
  props: KutProps
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
  ...children: (number | string | KutElement)[],
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
        && !~KUT_RESERVED_PROPS.indexOf(prop)
      ) {
        props[prop] = config[prop]
      }
    }
  }
  return { type, key, props }
}
