import React from '../src/kut'
import { TextInstance, DOMInstance, ComponentInstance } from '../src/instance'

describe('test/component.test.js', () => {
  it('should create a normal text instance', () => {
    const textInst = new TextInstance(1)

    expect((textInst as any)._element).toBe('1')
    expect(textInst.index).toBe(0)
    
    const markup = textInst.mount('kut')

    expect(textInst.kutId).toBe('kut')
    expect(textInst.key).toBe('0')
    expect(textInst.node).toBeNull()
    expect(markup).toBe('<span data-kutid="kut" >1</span>')

    document.body.innerHTML = markup

    expect(textInst.shouldReceive(1)).toBeTruthy()
    expect(textInst.shouldReceive(2)).toBeTruthy()
    expect(textInst.shouldReceive('a')).toBeTruthy()

    textInst.update(2)

    expect(textInst.node.innerText).toBe('2')
    expect((textInst as any)._element).toBe('2')

    textInst.unmount()

    expect(textInst.kutId).toBeUndefined()
    expect(textInst.index).toBeUndefined()
    expect((textInst as any)._element).toBeUndefined()
    expect(textInst.key).toBeNull()
    expect(textInst.node).toBeNull()

    document.body.innerHTML = null
  })

  it('should create a normal dom instance', () => {
    const element = <div className={{ show: true, hidden: false }} style={{ height: '100px' }}></div>
    const domInst = new DOMInstance(element)

    expect(domInst.index).toBe(0)
    expect((domInst as any)._element).toBe(element)

    const markup = domInst.mount('kut')

    expect(domInst.kutId).toBe('kut')
    expect((domInst as any)._childInstances.length).toBe(1)
    expect(domInst.key).toBe('0')
    expect(domInst.node).toBeNull()
    expect(markup).toBe('<div data-kutid="kut" class="show" style="height: 100px;" ><span data-kutid="kut:0" ></span></div>')

    document.body.innerHTML = markup

    expect(domInst.shouldReceive(<div></div>)).toBeTruthy()
    expect(domInst.shouldReceive(<a></a>)).toBeFalsy()
    expect(domInst.shouldReceive(<div key="a"></div>)).toBeFalsy()

    const nextElement = <div style={{ height: '50px' }}></div>
    domInst.update(nextElement)

    expect(domInst.node.outerHTML).toBe('<div data-kutid="kut" style="height: 50px;"><span data-kutid="kut:0"></span></div>')
    expect((domInst as any)._element).toBe(nextElement)

    domInst.unmount()

    expect(domInst.kutId).toBeUndefined()
    expect(domInst.index).toBeUndefined()
    expect((domInst as any)._element).toBeUndefined()
    expect((domInst as any)._childInstances).toBeUndefined()
    expect(domInst.key).toBeNull()
    expect(domInst.node).toBeNull()

    document.body.innerHTML = null
  })
})