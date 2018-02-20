import React from '../dist/lib/kut'
import Banner from './Component/Banner'
import Nav from './Component/Nav'
import Content from './Component/Content'
import './App.less'

const todo1 = [
  { key: 1, text: 'A' },
  { key: 2, text: 'B' },
  { key: 3, text: 'C' },
  { key: 4, text: 'D' },
  { key: 5, text: 'E' },
]

const todo2 = [
  { key: 4, text: 'D' },
  { key: 1, text: 'A' },
  { key: 6, text: 'F' },
  { key: 7, text: 'G' },
  { key: 5, text: 'E' },
  { key: 3, text: 'C' },
]

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fix: false,
      todos: todo1
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', e => {
      if (window.pageYOffset > 400 && !this.state.fix) {
        this.setState({ fix: true })
      } else if (window.pageYOffset <= 400 && this.state.fix) {
        this.setState({ fix: false })
      }
    })
  }
  render() {
    return (
      <div className="App">
        <Banner ref={node => window.i = node}/>
        <Nav fix={this.state.fix}>
          <a className={{ tab: true, color: this.state.fix }} href="#demo">演示</a>
          <a className={{ tab: true, color: this.state.fix }} href="#docu">文档</a>
        </Nav>
        <Content fix={this.state.fix}>
          <div id="demo">
            <ul>
              {
                this.state.todos.map(todo => <li key={todo.key}>{todo.text}</li>)
              }
            </ul>
            <button onClick={e => this.setState({ todos: todo2 })}>Change</button>
          </div>
          <div id="docu">
            docu
          </div>
        </Content>
      </div>
    )
  }
}

export default App
