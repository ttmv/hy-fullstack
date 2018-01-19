import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Nimi 1', id: 'Nimi 1', number: '000' }
      ],
      newName: '',
      newNum: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: this.state.newName,
      number: this.state.newNum,
      id: this.state.newName
    } 

    if (this.state.persons.find(p => p.id === personObj.id)) {
      alert(personObj.name + " on jo luettelossa.")
      return
    }

    const persons = this.state.persons.concat(personObj)
    this.setState({persons, newName: ''})    
  }

  handleNameChange = (event) => {
    this.setState({newName: event.target.value})
  }

  handleNumChange = (event) => {
    this.setState({newNum: event.target.value})
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
              onChange={this.handleNameChange}/>
            <br />
            <label htmlFor="num">Numero</label>  
            <input 
              type="text" id="num" 
              value={this.state.newNum} 
              onChange={this.handleNumChange}/>

          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <div>
          {this.state.persons.map(p => <p key={p.id}>{p.name} {p.number}</p>)}
        </div>
      
      </div>
    )
  }
}

export default App
