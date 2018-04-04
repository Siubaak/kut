import { createElement } from './element'
import { Component } from './component'
import { render } from './renderer'

/**
 * Kut入口
 */
const Kut = {
  createElement,
  Component,
  render,
}

/**
 * 如果有window，挂在window对象上
 */
if (window) {
  ;(window as any).Kut = Kut
}

/**
 * 导出
 */
export default Kut
