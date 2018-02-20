import React from '../index'
import Banner from './components/Banner'
import Nav from './components/Nav'
import Content from './components/Content'
import Demo from './components/Demo'
import Footer from './components/Footer'
import './App.less'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fix: false,
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
        <Banner/>
        <Nav fix={this.state.fix}>
          <a className={{ tab: true, color: this.state.fix }} href="#intro">介绍</a>
          <a className={{ tab: true, color: this.state.fix }} href="#demo">示例</a>
          <a className={{ tab: true, color: this.state.fix }} href="#docu">文档</a>
        </Nav>
        <Content fix={this.state.fix}>
          <div id="intro" className="anchor" />
          <div className="item">
            <h1 class="title">介绍</h1>
            <p class="desc indent">Kut，一个简单的React-Like的前端视图渲染库，是在学习React源码时造的轮子。目前Kut支持的方法仅有两个，即createElement、render，同时也支持组件开发，即Component类。已经能满足部分开发需求，这个网页本身就是基于Kut构建的，性能还行，不过暂时不建议用于生产环境。</p>
            <p class="desc indent">由于是参考(抄)的React，所以Kut基本的实现逻辑和React是相似的，Kut进行了改进的一个地方是diff算法。React的diff算法我称其为前向diff，<a href="https://zhuanlan.zhihu.com/p/20346379">这篇文章</a>讲得很好，我就不赘述了。对于把元素从列表中底部挪到顶部的做法，React的前向diff更新操作过多会影响性能，而Kut引入了后向diff，并取前向diff和后向diff的较优结果进行更新，从而提升性能。大家可以对示例中的待办事项进行添加、打乱、拖拽来体验。</p>
            <p class="desc indent">由衷感叹一下React实在是太强大了，特别是Fiber。接下来我会慢慢的完善Kut，以支持Context、Portal等特性。欢迎大家pull request和star。</p>
          </div>
          <div id="demo" className="anchor" />
          <div className="item">
            <h1 class="title">示例</h1>
            <Demo />
          </div>
          <div id="docu" className="anchor" />
          <div className="item">
            <h1 class="title">文档</h1>
            <p class="desc indent">Kut是基于TypeScript开发的，且自带了.d.ts文件，因此VSCode有良好的智能提醒。其实由于是参考(抄)的React，所以接口的用法基本一致。</p>
            <h2 class="title">Kut.Component</h2>
            <h2 class="title">Kut.createElement</h2>
            <h2 class="title">Kut.render</h2>
          </div>
        </Content>
        <Footer />
      </div>
    )
  }
}

export default App
