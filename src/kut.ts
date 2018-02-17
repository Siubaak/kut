import { createElement } from './element'
import { Component } from './component'
import { render } from './renderer'

const Kut = {
  createElement,
  Component,
  render,
}

if (window) {
  (window as any).Kut = Kut
}

export default Kut
