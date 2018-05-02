import { Component } from './component'
import { KutChild, KutElement } from './element'
import { KutInstance, TextInstance, DOMInstance, ComponentInstance } from './instance'
import { didMountSet, is } from './util'

/**
 * element实例化工厂函数
 * @param element 
 */
export function instantiate(element: KutChild) {
  let instance: KutInstance = null
  if (
    is.undefined(element)
    || is.null(element)
    || is.number(element)
    || is.string(element)
  ) {
    // 如果是number或string，证明VDOM树到根节点了
    instance = new TextInstance(element as string)
  } else if (is.string((element as KutElement).type)) {
    // 如果element.type是string，证明是div、p等内置DOM节点类型
    instance = new DOMInstance(element as KutElement)
  } else if (typeof (element as KutElement).type === typeof Component) {
    // 如果element.type是function，证明是Component
    instance = new ComponentInstance(element as KutElement)
  }
  return instance
}

/** 渲染并挂载DOM，container可选，若存在container则挂载
 * @param element 
 * @param container 
 */
export function render(
  element: KutChild,
  container: HTMLElement,
): void {
  const instance: KutInstance = instantiate(element)
  const markup: string = instance.mount('kut')
  container.innerHTML = markup
  // 调用所有componentDidMount方法
  didMountSet.exec()
}
