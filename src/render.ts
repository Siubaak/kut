import { KutProps, KutElement, createElement } from './element'
import { Component } from './component'

/**
 * 实例化Componenet，并调用render函数渲染Component返回HTMLElement
 * @param element 
 */
function instantiateComponent(element: KutElement): HTMLElement {
  const instance: Component = new ((element as KutElement).type as typeof Component)(element.props)
  const renderElement: KutElement = instance.render(element.props)
  const node = render(renderElement) as HTMLElement
  return node
}

/**
 * 递归创建HTMLElement，即DOM节点，并赋以属性，包括key、class、style等
 * @param element 
 */
function createHTMLElement(element: KutElement): HTMLElement {
  const node: HTMLElement = document.createElement((element as KutElement).type as string)
  const props = element.props
  if (element.key) {
    node.setAttribute('key', element.key)
  }
  for (let prop in props) {
    switch (prop) {
      case 'children':
        break
      case 'className':
        node.className = props.className
        break
      case 'style':
        for (let key in props.style) {
          if (
            (node.style as any)[key] !== undefined
            && Object.hasOwnProperty.call(props.style, key)
          ) {
            (node.style as any)[key] = props.style[key]
          }
        }
        break
      default:
        node.setAttribute(prop, props[prop])
    }
  }
  element.props.children
    .forEach(
      (child: number | string | KutElement) =>
      node.appendChild(render(child))
    )
  return node
}

/**
 * 渲染并挂载DOM，container可选，若存在container则挂载
 * @param element 
 * @param container 
 */
export function render(
  element: number | string | KutElement,
  container?: HTMLElement,
): Text | HTMLElement {
  let node: Text | HTMLElement
  if (typeof element === 'number' || typeof element === 'string') {
    // 如果是number或string，证明递归到头了，调用document.createTextNode创建Text即可
    node = document.createTextNode(element as string)
  } else if (typeof (element as KutElement).type === 'string') {
    // 如果element.type是string，证明是div、p等内置DOM节点类型，调用document.createHTMLElement创建DOM节点即可
    node = createHTMLElement(element as KutElement)
  } else if (typeof (element as KutElement).type === typeof Component) {
    // 如果element.type是function，证明是Component，调用instantiateComponent进行实例化并递归创建DOM节点即可
    node = instantiateComponent(element as KutElement)
  }
  if (node !== undefined && container) {
    if (container.children.length) {
      container.removeChild(container.children[0])
    }
    container.appendChild(node)
  }
  return node
}