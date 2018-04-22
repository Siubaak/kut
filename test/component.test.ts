import { Component } from '../src/component'

describe('test/component.test.js', () => {
  it('should create a customized component', () => {
    const Comp = class extends Component {}
    const inst = new Comp({ test: 'hello', children: [] })
    
    expect(typeof inst.state).toBe('object')
    expect(typeof inst.props).toBe('object')

    expect(typeof inst._updater).toBe('object')
    expect(typeof inst._updater.enqueueSetState).toBe('function')
    expect(typeof inst._updater.enqueueForceUpdate).toBe('function')

    expect(typeof inst.render).toBe('function')
  })
})