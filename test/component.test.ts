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
  })
})