import React from 'react'

const Country = ({country}) => {
    //console.log(country)
    const altTxt = "flag of " + country.name
    return (
      <div>
        name: {country.name} <br/>
        population: {country.population} <br/>
        <img src={country.flag} alt={altTxt}/>
      </div>
    )
  }

  export default Country


