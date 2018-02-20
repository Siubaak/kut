import React from '../../../index'
import './Footer.less'

class Footer extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <footer className="Footer">
        <a className="desc" href="https://github.com/Siubaak/kut">Github - Kut</a>
      </footer>
    )
  }
}

export default Footer
