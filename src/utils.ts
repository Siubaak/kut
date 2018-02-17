import { KutProps } from './element'
import { KUT_SUPPORTED_EVENT_HANDLERS } from './constant'

export function setProps(node: HTMLElement, props: KutProps, comparedProps?: KutProps): void {
  for (let prop in props) {
    if (prop === 'children') {
      continue
    } else if (
      prop === 'className'
      && (!comparedProps || comparedProps.className !== props.className)
    ) {
      if (typeof props.className === 'object') {
        node.className =
          Object.keys(props.className)
            .filter(cls => props.className[cls])
            .join(' ')
      } else if (Array.isArray(props.className)) {
        node.className = props.className.join(' ')
      } else {
        node.className = props.className.toString()
      }
    } else if (
      prop === 'style'
      && (!comparedProps || comparedProps.style !== props.style)
    ) {
      node.style.cssText = ''
      if (typeof props.style === 'object') {
        for (let key in props.style) {
          if (
            (node.style as any)[key] !== undefined
            && Object.hasOwnProperty.call(props.style, key)
          ) {
            (node.style as any)[key] = props.style[key]
          }
        }
      } else {
        node.setAttribute('style', props.style.toString())
      }
    } else if (
      KUT_SUPPORTED_EVENT_HANDLERS[prop.toLowerCase()]
      && typeof props[prop] === 'function'
      && (!comparedProps || comparedProps[prop] !== props[prop])
    ) {
      (node as any)[prop.toLowerCase()] = props[prop]
    } else if (!comparedProps || comparedProps[prop] !== props[prop]) {
      node.setAttribute(prop, props[prop])
    }
  }
}
