import React from '../dist/lib/kut'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.test = [
      <button onClick={this.handleClick}>1</button>,
      <button onClick={this.handleClick}>2</button>,
    ]
  }
  handleClick() {
    alert('成功')
  }
  render() {
    return (
      <div>
        {this.test}
      </div>
    )
  }
}

export default App
