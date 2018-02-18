import React from '../../../dist/lib/kut'
import './Nav.less'

class Nav extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="Nav">
        <div className={{
          nav: true,
          fix: this.props.fix,
        }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Nav
