import React from '../dist/lib/kut'

let index = 0

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: []
    }
  }
  handleClick() {
    const text = [...this.state.text]
    text.push(index++)
    this.setState({ text })
  }
  render() {
    return (
      <div>
        { this.state.text.map(t => <p>{t}</p>) }
        <button onClick={this.handleClick.bind(this)}>+</button>
      </div>
    )
  }
}

export default App
