import React from 'react';
import personService from './services/persons'
//import axios from 'axios';

const Input = (props) => 
  <div>
    <label htmlFor={props.id}>{props.text}</label> 
    <input 
      type="text" id={props.id} 
      value={props.value} 
      onChange={props.handleChange} />
  </div>

const Form = (props) => 
  <form onSubmit={props.handleSubmit}>
    <Input id="name" text="Nimi" value={props.newName} handleChange={props.handleNameChange} />
    <Input id="num" text="Numero" value={props.newNum} handleChange={props.handleNumChange} />

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
      persons: [],
      newName: '',
      newNum: '',
      filter: '',
      filtered: []
    }
  }

  componentWillMount() {
    personService
      .getAll()
      .then(persons => {
        console.log(persons)
        this.setState({persons})
      })
  }

  filterPersons = (event) => {
    this.setState({filter: event.target.value})
    const filtered = this.state.persons.filter(p => 
      p.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1)
    console.log(filtered)
    this.setState({filtered})
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: this.state.newName,
      number: this.state.newNum,
      //id: this.state.newName
    } 

    if (this.state.persons.find(p => p.name === personObj.name)) {
      alert(personObj.name + " on jo luettelossa.")
      return
    }

    personService
      .create(personObj)
      .then(p => {
        console.log(p)
        const persons = this.state.persons.concat(p)
        this.setState({persons, newName: '', newNum: ''})
      })
  }

  handleNameChange = (event) => {
    this.setState({newName: event.target.value})
  }

  handleNumChange = (event) => {
    this.setState({newNum: event.target.value})
  }

  render() {
    const personList = this.state.filter.length > 0 ? this.state.filtered : this.state.persons

    return (
      <div>
        <Header text="Puhelinluettelo" />
        <Input id="filter" text="Rajaa" value={this.state.filter} handleChange={this.filterPersons} />

        <Header text="Lisää uusi" />
        <Form 
          handleSubmit={this.addPerson} 
          handleNameChange={this.handleNameChange} 
          handleNumChange={this.handleNumChange}
          newName={this.state.newName}
          newNum={this.state.newNum}
        />
        <Header text="Numerot" />
        <Persons persons={personList} />      
      </div>
    )
  }
}

export default App
