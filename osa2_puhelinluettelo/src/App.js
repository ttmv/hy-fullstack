import React from 'react';
import personService from './services/persons'

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

const Person = ({person, remove}) => 
  <tr className="note">
    <td>{person.name}</td> 
    <td>{person.number}</td>
    <td><button onClick={remove}>poista</button></td>
  </tr>

const Persons = ({persons, remove}) => 
  <table>
    <tbody>
      { persons.map(p => 
        <Person key={p.id} person={p} remove={remove(p.id)}/>) }
    </tbody>
  </table>


const Notification = ({msg}) => {
  if (msg === '') return null
  return (
    <div className="notification">
      {msg}
    </div>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNum: '',
      filter: '',
      filtered: [],
      msg: ''
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

    const old = this.state.persons.find(p => p.name === personObj.name)

    if (old) {
      if (!window.confirm(old.name + " on jo luettelossa, korvataanko vanha numero?")) {
        this.setState({newName: '', newNum: ''})
        return
      } 

      personService
        .update(old.id, personObj)
        .then(resp => {
          const persons = this.state.persons.filter(p => p.id !== old.id).concat(resp)
          this.setState({persons, newName: '', newNum: ''})
          this.notify(`numero muutettu`)
        })

    } else {
      personService
      .create(personObj)
      .then(p => {
        console.log(p)
        const persons = this.state.persons.concat(p)
        this.setState({persons, newName: '', newNum: ''})
        this.notify(`${p.name}' lisätty`)
      })
    }
  }

  removePerson = (id) => {
    return () => {
      const p = this.state.persons.find(p => p.id === id)

      if (window.confirm("Poistetaanko " + p.name + "?")) {
        personService.remove(id).then(response=>{
          console.log(response)
          const persons = this.state.persons.filter(p => p.id !== id)
          this.setState({persons})
          this.notify(`${p.name}' poistettu`)
        })        
      }
    }
  }

  notify = (msg) => {
    this.setState({msg})
    setTimeout(() => {
      this.setState({msg: ''})
    }, 4000)
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
        <Notification msg={this.state.msg} />
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
        <Persons persons={personList} remove={this.removePerson}/>      
      </div>
    )
  }
}

export default App
