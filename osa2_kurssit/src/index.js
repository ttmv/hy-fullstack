import React from 'react'
import ReactDOM from 'react-dom'


const Otsikko = ({ nimi }) => {
  return (
    <h1>{nimi}</h1>
  )
}

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

const App = () => {
  const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        }
      ]
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Otsikko nimi="Opetusohjelma" />
      {kurssit.map(kurssi=> <Kurssi key={kurssi.id} kurssi={kurssi} />)}
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

