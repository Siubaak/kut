import { KutChild } from './element'
import { instantiate } from './instance'

/** 渲染并挂载DOM，container可选，若存在container则挂载
 * @param element 
 * @param container 
 */
export function render(
  element: KutChild,
  container: HTMLElement,
): void {
  const instance = instantiate(element, container)
  instance.mount()
}