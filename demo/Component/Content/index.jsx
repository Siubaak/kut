import React from '../../../dist/lib/kut'
import './Content.less'

class Content extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="Content">
        <div className={{
          content: true,
          top: this.props.fix,
        }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Content
