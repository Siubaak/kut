import './env-setup'
import * as assert from 'power-assert'
import { Component } from '../src/component'

describe('test/component.test.js', () => {
  it('should create a customized component', () => {
    const Comp = class extends Component {}
    const inst = new Comp({ test: 'hello', children: [] })
    
    assert(typeof inst.state === 'object')
    assert(typeof inst.props === 'object')
    assert(typeof inst.update === 'function')

    assert(typeof inst.render === 'function')

    assert(typeof inst.componentWillMount === 'function')
    assert(typeof inst.componentDidMount === 'function')
    assert(typeof inst.componentWillReceiveProps === 'function')
    assert(typeof inst.shouldComponentUpdate === 'function')
    assert(typeof inst.componentWillUpdate === 'function')
    assert(typeof inst.componentDidUpdate === 'function')
    assert(typeof inst.componentWillUnmount === 'function')
  })
})