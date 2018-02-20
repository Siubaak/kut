import React from '../../../index'
import './Nav.less'

class Nav extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <nav className="Nav">
        <div className={{
          nav: true,
          fix: this.props.fix,
        }}>
          {this.props.children}
        </div>
      </nav>
    )
  }
}

export default Nav
