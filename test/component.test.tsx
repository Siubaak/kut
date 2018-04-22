import React from '../src/kut'
import { Component } from '../src/component'
import { KutElement } from '../src/element'

describe('test/component.test.js', () => {
  class Comp extends Component {
    constructor(props) {
      super(props)
      this.state = { test: 'world' }
    }
    render(): KutElement {
      return <div></div>
    }
  }
  Comp.defaultProps = {}

  it('should create a customized component', () => {
    const comp = new Comp({ test: 'hello', children: [] })
    
    expect(Comp.defaultProps).toEqual({})
    expect(comp.props).toEqual({ test: 'hello', children: [] })
    expect(comp.state).toEqual({ test: 'world' })

    expect(typeof comp._updater).toBe('object')
    expect(typeof comp._updater.enqueueSetState).toBe('function')
    expect(typeof comp._updater.enqueueForceUpdate).toBe('function')

    expect(typeof Component.prototype.render).toBe('function')
    expect(Component.prototype.render()).toEqual(null)
    expect(typeof comp.render).toBe('function')
    expect(comp.render()).toEqual(<div></div>)
  })
})