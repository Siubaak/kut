import React from '../dist/lib/kut'

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  handleClick() {
    alert('成功')
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>测试</button>
      </div>
    )
  }
}

export default App
