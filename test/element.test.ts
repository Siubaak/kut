import './env-setup'
import * as assert from 'power-assert'
import { createElement, KutElement, KutChild } from '../src/element'
import { Component } from '../src/component'

describe('test/element.test.js', () => {
  it('should create a native kut element', () => {
    const className = { height: '100px' }

    const element: KutElement = createElement('div', { className })

    assert(element.type === 'div')
    assert(element.props.className === className)
    assert(Array.isArray(element.props.children)
      && element.props.children.length === 1
      && element.props.children[0] === '')
  })

  it('should create a component kut element', () => {
    const className = { height: '100px' }

    const Comp = class extends Component {}
    Comp.defaultProps = { test: 'hello' }
    const element: KutElement = createElement(Comp, { className })

    assert(element.type === Comp)
    assert(element.props.test === 'hello')
    assert(element.props.className === className)
    assert(Array.isArray(element.props.children)
      && element.props.children.length === 1
      && element.props.children[0] === '')
  })

  it('should create a kut element with children', () => {
    const className = { height: '100px' }

    const Comp = class extends Component {}
    const element: KutElement = createElement(
      'div',
      { className },
      'test',
      createElement('a', { key: '1', className }),
      createElement(Comp, { key: '2', className }),
    )

    assert(element.type === 'div')
    assert(element.props.className === className)
    assert(Array.isArray(element.props.children)
      && element.props.children.length === 3)
  
    const children: KutChild[] = element.props.children
    assert(children[0] === 'test')
    assert((children[1] as KutElement).type === 'a'
      && (children[1] as KutElement).key === '1'
      && (children[1] as KutElement).props.className === className)
    assert((children[2] as KutElement).type === Comp
      && (children[2] as KutElement).key === '2'
      && (children[2] as KutElement).props.className === className)
  })
})