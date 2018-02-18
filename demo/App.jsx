import React from '../dist/lib/kut'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      list: []
    }
  }
  handleChange(e) {
    this.setState({ text: e.target.value })
  }
  handleAdd() {
    const list = [ ...this.state.list ]
    list.push(this.state.text)
    this.setState({ text: '', list })
  }
  handleDel() {
    const list = [ ...this.state.list ]
    list.pop()
    this.setState({ list })
  }
  render() {
    return (
      <div>
        <div>
          <input onInput={this.handleChange.bind(this)} value={this.state.text}></input>
          <button onClick={this.handleAdd.bind(this)}>+</button>
          <button onClick={this.handleDel.bind(this)}>-</button>
        </div>
        <ul>
          { this.state.list.map(t => <li>{t}</li>) }
        </ul>
      </div>
    )
  }
}

export default App
