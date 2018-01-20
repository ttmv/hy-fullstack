import React from 'react'

class Countries extends React.Component {

  handleClick = (name) => {
    return () => {
      this.props.handleClick(name)
    }
  }
  
  render () {
    return (
      <ul>
        {this.props.countries.map(m => 
          <li key={m.name} onClick={this.handleClick(m.name)}> {m.name}</li>)}
      </ul>
    )   
  }
} 
  

export default Countries