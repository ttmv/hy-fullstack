import React from 'react'

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  render() {
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }
    const label = this.state.visible ? this.props.closeLabel : this.props.openLabel

    return (
      <div>
        <button onClick={this.toggleVisibility} style={this.props.style}>{label}</button>
        <div style={showWhenVisible}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Togglable