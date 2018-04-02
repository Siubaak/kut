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
          <a className={{ tab: true, color: this.state.fix }} href="#docs">文档</a>
        </Nav>
        <Content fix={this.state.fix}>
          <div id="intro" className="anchor" />
          <div className="item">
            <h1 className="title">介绍</h1>
            <p className="desc indent">Kut，一个简单的React-Like的前端视图渲染库，是在学习React源码时造的轮子。目前Kut支持的方法仅有两个，即createElement、render，同时也支持组件化开发，即Component类。已经能满足部分开发需求，这个网页本身就是基于Kut构建的，性能还行。</p>
            <p className="desc indent">由于是参考（抄）的React，所以Kut基本的实现逻辑和React是相似的，Kut进行了改进的一个地方是diff算法。React的diff算法我称其为前向diff，这篇<a href="https://zhuanlan.zhihu.com/p/20346379">文章</a>讲得很好，我就不赘述了。对于把元素从列表中底部挪到顶部的做法，React的前向diff更新操作过多会影响性能，而Kut引入了后向diff，并取前向diff和后向diff的较优结果进行更新，从而提升性能（后面发现有些项目也是这么做的）。大家可以对示例中的待办事项进行添加、打乱来体验。</p>
            <p className="desc indent">由衷感叹一下React实在是太强大了，特别是Fiber。接下来我会慢慢的支持Context、Portal等特性。欢迎大家Pull Request和Star。学习过程中看到的项目有<a href="https://github.com/facebook/react">React</a>、<a href="https://github.com/CodeFalling/react-tiny">React-Tiny</a>、<a href="https://github.com/RubyLouvre/anu">Anu</a>和<a href="https://github.com/215566435/Luy">Luy</a>，而图标是<a href="http://www.iconfont.cn">Iconfont</a>上随手搜索得到的，表示感谢。</p>
          </div>
          <div id="demo" className="anchor" />
          <div className="item">
            <h1 className="title">示例</h1>
            <Demo />
          </div>
          <div id="docs" className="anchor" />
          <div className="item">
            <h1 className="title">文档</h1>
            <p className="desc indent">Kut是基于TypeScript开发的，且编译打包文件自带声明，因此VSCode有良好的智能提示。其实由于是参考（抄）的React，所以接口的用法基本一致。</p>
            <h2 className="title">Kut.createElement</h2>
            <section className="code">function createElement(type, config, ...children): KutElement</section>
            <p className="desc indent">KutElement的工厂函数。参数为type、config、children。其中type类型为string或typeof Component，config类型为any，children类型为string[]或number[]或KutElement[]。返回值为KutElement即Virtual DOM节点对象。type参数接受普通的文本、内置DOM类型字面量（如div、h1等）和Kut.Component继承子类；config参数为Virtual DOM节点的属性，包括唯一识别key、类名className、样式style等等任意属性；children参数为该节点的子节点数组，元素为KutElement。若使用JSX以及Babel进行转换的话将不需要手动调用该方法。</p>
            <h2 className="title">Kut.Component</h2>
            <section className="code">class Component {'{'} constructor(props) {'{'} {'}'} {'}'}</section>
            <p className="desc indent">组件类基类。与React相同，进行组件开发时必须继承此类。目前暂不支持Context特性，故无法使用React-Redux，构造参数仅有props，为Virtual DOM父节点传入属性。目前支持setState(state)和forceUpdate()方法，以及生命周期函数componentWillMount()、componentDidMount()、shouldComponentUpdate(nextProps, nextState)、componentWillUpdate(nextProps, nextState)、componentDidUpdate()、componentWillUnmount()。</p>
            <h2 className="title">Kut.render</h2>
            <section className="code">function render(element, container?): void | string</section>
            <p className="desc indent">渲染挂载函数。参数为element、container。其中element类型为string、number或KutElement，container类型为HTMLElement，即DOM节点实例。container参数可选，提供时将使用container.innerHTML进行渲染挂载，缺省时将返回渲染的字符串。</p>
          </div>
        </Content>
        <Footer />
      </div>
    )
  }
}

export default App
