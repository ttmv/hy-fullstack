import React from 'react';

const Form = (props) => 
  <form onSubmit={props.handleSubmit}>
    <div>
      <label htmlFor="name">Nimi</label> 
      <input 
        type="text" id="name" 
        value={props.newName} 
        onChange={props.handleNameChange}/>
      <br />
      <label htmlFor="num">Numero</label>  
      <input 
        type="text" id="num" 
        value={props.newNum} 
        onChange={props.handleNumChange}/>
    </div>
    <div>
    <button type="submit">lisää</button>
  </div>
</form>

const Header = ({text}) => <h2>{text}</h2>

const Persons = ({persons}) => 
  <div>
    {persons.map(p => <p key={p.id}>{p.name} {p.number}</p>)}
  </div>


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
    this.setState({persons, newName: '', newNum: ''})    
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
        <Header text="Puhelinluettelo" />
        <Header text="Lisää uusi" />
        <Form 
          handleSubmit={this.addPerson} 
          handleNameChange={this.handleNameChange} 
          handleNumChange={this.handleNumChange}
          newName={this.state.newName}
          newNum={this.state.newNum}
        />
        <Header text="Numerot" />
        <Persons persons={this.state.persons} />      
      </div>
    )
  }
}

export default App
