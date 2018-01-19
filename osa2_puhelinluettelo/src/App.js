import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Nimi 1', id: 'Nimi 1' }
      ],
      newName: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: this.state.newName,
      id: this.state.newName
    } 

    if (this.state.persons.find(p => p.id === personObj.id)) {
      alert(personObj.name + " on jo luettelossa.")
      return
    }
    const persons = this.state.persons.concat(personObj)

    this.setState({persons: persons, newName: ''})    
  }

  handleChange = (event) => {
    console.log(event.target)
    this.setState({newName: event.target.value})
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            <label htmlFor="name">Nimi</label> 
            <input 
              type="text" id="name" 
              value={this.state.newName} 
              onChange={this.handleChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <div>
          {this.state.persons.map(p => <p key={p.id}>{p.name}</p>)}
        </div>
      
      </div>
    )
  }
}

export default App
