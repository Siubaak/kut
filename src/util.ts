import { KUT_ID } from './constant'

/**
 * ES6 Object.assign的polyfill
 * @param objects 
 */
function assign(...objects: any[]): any {
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

if (!(Object as any).assign) {
  ;(Object as any).assign = assign
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
  private _didMountHandlers: (() => void)[] = []
  add(handler: () => void) {
    this._didMountHandlers.push(handler)
  }
  exec() {
    while (this._didMountHandlers.length) {
      const handler = this._didMountHandlers.shift()
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

  /**
   * 优先队列构造函数，其中对比函数用于建堆
   * @param compare 对比函数
   */
  constructor(compare: (contrast: T, self: T) => boolean) {
    this._compare = compare
  }
  get length(): number {
    return this._arr.length
  }
  /**
   * 向优先队列压入一项
   * @param item 
   */
  push(item: T): void {
    this._arr.push(item)
    this._promote(this._arr.length - 1)
  }
  /**
   * 返回优先队列中优先级最高一项，并从队列中去掉
   */
  shift(): T {
    let m
    if (this._arr.length > 1) {
      m = this._arr[0]
      this._arr[0] = this._arr.pop()
      this._heapify(0)
    } else {
      m = this._arr.pop()
    }
    return m
  }

  /**
   * 以位置i为根节点建堆
   * @param i 
   */
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
  /**
   * 提升i位置对应项
   * @param i 
   */
  private _promote(i: number): void {
    let p = this._parent(i)
    while (this._arr[p] && this._compare(this._arr[p], this._arr[i])) {
      [ this._arr[i], this._arr[p] ] = [ this._arr[p], this._arr[i] ]
      i = p
      p = this._parent(i)
    }
  }
  /**
   * 返回i位置对应项的父节点i
   * @param i 
   */
  private _parent(i: number): number {
    return Math.floor((i + 1) / 2) - 1
  }
  /**
   * 返回i位置对应项的左孩子节点i
   * @param i 
   */
  private _left(i: number): number {
    return 2 * (i + 1) - 1
  }
  /**
   * 返回i位置对应项的右孩子节点i
   * @param i 
   */
  private _right(i: number): number {
    return 2 * (i + 1)
  }
}

function toString(val: any): string {
  return Object.prototype.toString.call(val)
}

/**
 * 类型严格判断
 */
export const is = {
  undefined: (val: any) => toString(val) === '[object Undefined]',
  null: (val: any) => toString(val) === '[object Null]',
  number: (val: any) => toString(val) === '[object Number]',
  string: (val: any) => toString(val) === '[object String]',
  boolean: (val: any) => toString(val) === '[object Boolean]',
  symbol: (val: any) => toString(val) === '[object Symbol]',
  object: (val: any) => toString(val) === '[object Object]',
  array: (val: any) => toString(val) === '[object Array]',
  function: (val: any) => toString(val) === '[object Function]',
}