import { KUT_ID } from './constant'

export function getParentID(childID: string): string {
  const regex = /[:]\w+$/
  return regex.test(childID) && childID.replace(regex, '')
}

export function getNode(kutId: string): HTMLElement {
  return document.querySelector(`[${KUT_ID}="${kutId}"]`)
}

export function createNode(markup: string): Text | HTMLElement {
  if (markup === '') {
    return document.createTextNode('')
  } else {
    const node: HTMLElement = document.createElement('div')
    node.innerHTML = markup
    return node.firstChild as HTMLElement
  }
}

export function getClassString(className: any): string {
  let markup: string = ''
  if (className == null) {
  } else if (typeof className === 'object') {
    markup +=
      Object.keys(className)
        .filter(cls => className[cls])
        .join(' ')
  } else if (Array.isArray(className)) {
    markup += className.join(' ')
  } else {
    markup += className.toString()
  }
  return markup.trim()
}

export function getStyleString(style: any): string {
  let markup: string = ''
  if (style == null) {
  } else if (typeof style === 'object') {
    for (let key in style) {
      if (Object.hasOwnProperty.call(style, key)) {
        markup += 
          // 驼峰式转换，如backgroundColor转换为background-color
          // 同时支持backgroundColor和background-color命名
          key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
          + `: ${style[key]}; `
      }
    }
  } else {
    markup += style.toString()
  }
  return markup.trim()
}
