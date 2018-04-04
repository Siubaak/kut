import { KUT_ID } from './constant'

/**
 * ES6 Object.assign的polyfill
 * @param objects 
 */
export function assign(...objects: any[]): any {
  if (objects.length === 0) {
    return null
  } else {
    const obj = objects[0]
    for (let i = 1; i < objects.length; ++i) {
      for (const key in objects[i]) {
        if (Object.hasOwnProperty.call(objects[i], key)) {
          obj[key] = objects[i][key]
        }
      }
    }
    return obj
  }
}

/**
 * 根据kutId获取其父节点kutId
 * @param childID 
 */
export function getParentID(childID: string): string {
  const regex = /[:]\w+$/
  return regex.test(childID) && childID.replace(regex, '')
}

/**
 * 根据kutId获取其DOM上挂载的节点，若没挂载则返回undefined
 * @param kutId 
 */
export function getNode(kutId: string): HTMLElement {
  return document.querySelector(`[${KUT_ID}="${kutId}"]`)
}

/**
 * 根据html markup字符串生成DOM并返回其根节点
 * @param markup 
 */
export function createNode(markup: string): Text | HTMLElement {
  if (markup === '') {
    return document.createTextNode('')
  } else {
    const node: HTMLElement = document.createElement('div')
    node.innerHTML = markup
    return node.firstChild as HTMLElement
  }
}

/**
 * 转换className属性为tag class字符串
 * @param className 
 */
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

/**
 * 转换style属性为tag style字符串
 * @param style 
 */
export function getStyleString(style: any): string {
  let markup: string = ''
  if (style == null) {
  } else if (typeof style === 'object') {
    for (const key in style) {
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

/**
 * componentDidMount数据集，用于储存componentDidMount方法，
 * 并统一在挂载完后执行
 */
export class DidMountSet {
  private _didMountHandlers: Function[] = []
  add(handler: Function) {
    this._didMountHandlers.push(handler)
  }
  exec() {
    while(this._didMountHandlers.length) {
      const handler: Function = this._didMountHandlers.pop()
      handler()
    }
  }
}

/**
 * 导出DidMountSet的单例
 */
export const didMountSet: DidMountSet = new DidMountSet()

/**
 * 二叉堆实现优先队列类，用于Reconciler
 */
export class Heap<T> {
  private readonly _arr: T[] = []
  private readonly _compare: (contrast: T, self: T) => boolean
  constructor(compare: (contrast: T, self: T) => boolean) {
    this._compare = compare
  }
  get length(): number {
    return this._arr.length
  }
  push(item: T): void {
    this._arr.push(item)
    this._promote(this._arr.length - 1)
  }
  pop(): T {
    const len = this._arr.length
    let m
    if (len > 1) {
      m = this._arr[0]
      this._arr[0] = this._arr.pop()
      this._heapify(0)
    } else {
      m = this._arr.pop()
    }
    return m
  }

  // 下面是二叉堆维护方法
  private _heapify(i: number): void {
    const l = this._left(i)
    const r = this._right(i)
    let m = i
    if (this._arr[l] && this._compare(this._arr[l], this._arr[i])) {
      m = l
    }
    if (this._arr[r] && this._compare(this._arr[r], this._arr[i])) {
      m = r
    }
    if (m !== i) {
      [ this._arr[i], this._arr[m] ] = [ this._arr[m], this._arr[i] ]
      this._heapify(m)
    }
  }
  private _promote(i: number): void {
    let p = this._parent(i)
    while(this._arr[p] && this._compare(this._arr[p], this._arr[i])) {
      [ this._arr[i], this._arr[p] ] = [ this._arr[p], this._arr[i] ]
      i = p
      p = this._parent(i)
    }
  }
  private _parent(i: number): number {
    return Math.floor((i + 1) / 2) - 1
  }
  private _left(i: number): number {
    return 2 * (i + 1) - 1
  }
  private _right(i: number): number {
    return 2 * (i + 1)
  }
}
