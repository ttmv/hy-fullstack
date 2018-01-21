import React from 'react'

const Country = ({country}) => {
  //console.log(country)
  const altTxt = "flag of " + country.name
  return (
    <div>
      <table>
        <tbody>
          <tr><td>name:</td><td>{country.name}</td></tr>
          <tr><td>native name:</td><td>{country.nativeName}</td></tr>
          <tr><td>capital:</td><td>{country.capital}</td></tr>
          <tr><td>population:</td><td>{country.population}</td></tr>
          <tr><td>region:</td><td>{country.region}</td></tr>
          <tr><td>subregion:</td><td>{country.subregion}</td></tr>
        </tbody>
      </table>
      <img src={country.flag} alt={altTxt}/>
    </div>
  )
}

export default Country


