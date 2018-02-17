import React from '../dist/lib/kut'

let index = 0

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: []
    }
  }
  handleAdd() {
    const text = [...this.state.text]
    text.push(index++)
    this.setState({ text, show: !this.state.show })
  }
  handleMinus() {
    const text = [...this.state.text]
    text.pop()
    index--
    this.setState({ text, show: !this.state.show })
  }
  render() {
    return (
      <div>
        <div>
          { this.state.text.map(t => <p>{t}</p>) }
        </div>
        <div>
          <button onClick={this.handleAdd.bind(this)}>+</button>
          <button onClick={this.handleMinus.bind(this)}>-</button>
        </div>
      </div>
    )
  }
}

export default App
