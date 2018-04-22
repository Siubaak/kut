import React from '../src/kut'
import { KutElement } from '../src/element'
import { instantiate, render } from '../src/renderer'
import { TextInstance, DOMInstance, ComponentInstance } from '../src/instance'

describe('test/render.test.js', () => {
  it('should create a text instance', () => {
    expect(instantiate('a')).toBeInstanceOf(TextInstance)
    expect(instantiate(1)).toBeInstanceOf(TextInstance)
  })
  
  it('should create a dom instance', () => {
    expect(instantiate(<div></div>)).toBeInstanceOf(DOMInstance)
  })

  it('should create a component instance', () => {
    class Comp extends React.Component {}
    expect(instantiate(<Comp></Comp>)).toBeInstanceOf(ComponentInstance)
  })

  it('should render a text', () => {
    render('a', document.body)
    expect(document.body.innerHTML).toBe('<span data-kutid="kut">a</span>')
    render(1, document.body)
    expect(document.body.innerHTML).toBe('<span data-kutid="kut">1</span>')
    document.body.innerHTML = null
  })

  it('should render a dom', () => {
    render(<div></div>, document.body)
    expect(document.body.innerHTML).toBe('<div data-kutid="kut"><span data-kutid="kut:0"></span></div>')
    document.body.innerHTML = null
  })

  it('should render dom excuting component.render', () => {
    class Comp extends React.Component {
      render(): KutElement {
        return <div>hello world</div>
      }
    }
    render(<Comp></Comp>, document.body)
    expect(document.body.innerHTML).toBe('<div data-kutid="kut"><span data-kutid="kut:0">hello world</span></div>')
    document.body.innerHTML = null
  })
})