import React from '../../../index'
import './Content.less'

class Content extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="Content">
        <div className={{
          top: this.props.fix,
        }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Content
