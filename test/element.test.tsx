import React from '../src/kut'
import { KutElement, KutChild } from '../src/element'

describe('test/element.test.js', () => {
  const className = { height: '100px' }

  it('should create a native kut element', () => {
    const element: KutElement = <div className={className}></div>

    expect(element.type).toBe('div')
    expect(element.props.className).toBe(className)
    expect(Array.isArray(element.props.children)).toBeTruthy()
    expect(element.props.children.length).toBe(1)
    expect(element.props.children[0]).toBe('')
  })

  it('should create a component kut element', () => {
    const Comp = class extends React.Component {}
    Comp.defaultProps = { test: 'hello' }
    const element: KutElement = <Comp className={className}></Comp>

    expect(element.type).toBe(Comp)
    expect(element.props.test).toBe('hello')
    expect(element.props.className).toBe(className)
    expect(Array.isArray(element.props.children)).toBeTruthy()
    expect(element.props.children.length).toBe(1)
    expect(element.props.children[0]).toBe('')
  })

  it('should create a kut element with children', () => {
    const Comp = class extends React.Component {}
    const element: KutElement = (
      <div className={className}>
        test
        <a key="1" className={className}></a>
        <Comp key="2" className={className}></Comp>
      </div>
    )

    expect(element.type).toBe('div')
    expect(element.props.className).toBe(className)
    expect(Array.isArray(element.props.children)).toBeTruthy()
    expect(element.props.children.length).toBe(3)
  
    const children: KutChild[] = element.props.children

    expect(children[0]).toBe('test')
    expect((children[1] as KutElement).type).toBe('a')
    expect((children[1] as KutElement).key).toBe('1')
    expect((children[1] as KutElement).props.className).toBe(className)
    expect((children[2] as KutElement).type).toBe(Comp)
    expect((children[2] as KutElement).key).toBe('2')
    expect((children[2] as KutElement).props.className).toBe(className)
  })
})