import React from 'react'
import axios from 'axios'

const Input = (props) => 
  <div>
    <label htmlFor={props.id}>{props.text}</label> 
    <input 
      type="text" id={props.id} 
      value={props.value} 
      onChange={props.handleChange} />
  </div>

const CountryInfo = ({country}) => {
  console.log("vain yksi")
  console.log(country)
  const altTxt = "flag of " + country.name
  return (
    <div>
      name: {country.name} <br/>
      population: {country.population} <br/>
      <img src={country.flag} alt={altTxt}/>
    </div>
  )
}


const Display = ({countries}) => {
  console.log("length: "+countries.length)
  if (countries.length === 0) return (<p>no matches</p>)
  if (countries.length > 10) return (<p>too many matches, specify another filter</p>)
  if (countries.length <=10 && countries.length >1)     
      return <Countries countries={countries} />

  if (countries.length ===1) return (<CountryInfo country={countries[0]} />)
}

const Countries = ({countries}) => 
<ul>
  {countries.map(m => <Country key={m.name} country={m}/>)}
</ul>

const Country = ({country}) => <li>{country.name}</li>

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
        const countries = response.data
        console.log("resp")
        this.setState({countries})
      })
  }

  handleChange = (event) => {
    this.setState({filter: event.target.value})
    const filtered = this.state.countries.filter(country => 
      country.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1)
    console.log(filtered)
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
      <Display countries={this.state.filtered}/>
      </div>
    )
  }
}

export default App;
