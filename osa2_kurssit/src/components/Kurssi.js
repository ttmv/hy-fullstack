import React from 'react'
import Otsikko from './Otsikko'

const Osa = ({ osa }) =>  <p>{osa.nimi} {osa.tehtavia}</p>

const Sisalto = ({ osat }) => {
  return (
    <div>
      {osat.map(osa => <Osa key={osa.id} osa={osa} />)}
    </div>
  )
}

const Yhteensa = ({ osat }) => {
  const tehtavat = osat.map(osa => osa.tehtavia)
  const yht = tehtavat.reduce((acc, curr) => acc + curr)
  
  return (
    <p>yhteensä {yht} tehtävää.</p>
  )
}

const Kurssi = ({ kurssi }) => {
  return (
    <div>
      <Otsikko nimi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat} />
    </div>
  )
}

export default Kurssi