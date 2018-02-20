import React from '../../../index'
import './Banner.less'

class Banner extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <header className="Banner">
        <h1 className="title">Kut</h1>
        <p className="desc">数据驱动的前端视图渲染库</p>
        <div className="link">
          <a href="https://www.npmjs.com/package/kut">
            <img src="https://img.shields.io/npm/v/kut.svg?style=flat-square" alt=""/>
          </a>
          <a href="https://github.com/Siubaak/kut">
            <img src="https://img.shields.io/github/stars/Siubaak/kut.svg?style=flat-square&label=Stars" alt=""/>
          </a>
        </div>
      </header>
    )
  }
}

export default Banner
