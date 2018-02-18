import React from '../dist/lib/kut'
import Banner from './Component/Banner'
import Nav from './Component/Nav'
import Content from './Component/Content'
import './App.less'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fix: false
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
            demo
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
