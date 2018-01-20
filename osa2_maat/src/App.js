import React from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Country from './components/Country'


const Input = (props) => 
  <div>
    <label htmlFor={props.id}>{props.text}</label> 
    <input 
      type="text" id={props.id} 
      value={props.value} 
      onChange={props.handleChange} />
  </div>

const Display = ({countries, handleClick}) => {
  if (countries.length === 0) return (<p>no matches</p>)
  if (countries.length > 10) return (<p>too many matches, specify another filter</p>)
  if (countries.length <=10 && countries.length >1)     
    return <Countries countries={countries} handleClick={handleClick}/>
  if (countries.length ===1) 
    return <Country country={countries[0]} />
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: '',
      filtered: []
    }
  }

  componentWillMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log("resp")
        const countries = response.data
        this.setState({countries})
      })
  }
  
  handleChange = (event) => {
    this.filterCountries(event.target.value)
  }

  filterCountries = (filter) => {
    this.setState({filter})
    const filtered = this.state.countries.filter(country => 
      country.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)
    //console.log(filtered)
    this.setState({ filtered })  
  } 

  render() {
    return (
      <div>
        <Input 
          id="filter" text="Find countries" 
          value={this.state.filter} 
          handleChange={this.handleChange} 
        />
        <Display countries={this.state.filtered} handleClick={this.filterCountries}/>
      </div>
    )
  }
}

export default App;
