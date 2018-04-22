import React from '../src/kut'
import { KutElement, KutChild } from '../src/element'

describe('test/element.test.js', () => {
  const style = { height: '100px' }

  it('should create a native kut element', () => {
    const element: KutElement = <div ref={jest.fn()} className="test" style={style}></div>

    expect(element.type).toBe('div')
    expect(element.props.className).toBe('test')
    expect(element.props.style).toBe(style)
    expect(Array.isArray(element.props.children)).toBeTruthy()
    expect(element.props.children.length).toBe(1)
    expect(element.props.children[0]).toBe('')
  })

  it('should create a component kut element', () => {
    class Comp extends React.Component {}
    Comp.defaultProps = { test: 'hello' }
    const element: KutElement = <Comp className="test" style={style}></Comp>

    expect(element.type).toBe(Comp)
    expect(element.props.test).toBe('hello')
    expect(element.props.className).toBe('test')
    expect(element.props.style).toBe(style)
    expect(Array.isArray(element.props.children)).toBeTruthy()
    expect(element.props.children.length).toBe(1)
    expect(element.props.children[0]).toBe('')
  })

  it('should create a kut element with children', () => {
    class Comp extends React.Component {}
    const element: KutElement = (
      <div className="test" style={style}>
        test
        <a key="1" style={style}></a>
        <Comp key="2" style={style}></Comp>
      </div>
    )

    expect(element.type).toBe('div')
    expect(element.props.className).toBe('test')
    expect(element.props.style).toBe(style)
    expect(Array.isArray(element.props.children)).toBeTruthy()
    expect(element.props.children.length).toBe(3)
  
    const children: KutChild[] = element.props.children

    expect(children[0]).toBe('test')
    expect((children[1] as KutElement).type).toBe('a')
    expect((children[1] as KutElement).key).toBe('1')
    expect((children[1] as KutElement).props.style).toBe(style)
    expect((children[2] as KutElement).type).toBe(Comp)
    expect((children[2] as KutElement).key).toBe('2')
    expect((children[2] as KutElement).props.style).toBe(style)
  })
})