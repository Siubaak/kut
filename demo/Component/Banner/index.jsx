import React from '../../../dist/lib/kut'
import './Banner.less'

class Banner extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="Banner" ref={node => window.j = node}>
        <h1 className="text">Kut</h1>
      </div>
    )
  }
}

export default Banner
