import React from 'react'
import ReactDOM from 'react-dom'



const Otsikko = (props) => {
  return (
    <h1>{props.kurssi.nimi}</h1>
  )
}

const Osa = (props) =>  <p>{props.osa.nimi} {props.osa.tehtavia}</p>

const Sisalto = (props) => {
  return (
    <div>
      <Osa osa={props.kurssi.osat[0]} />
      <Osa osa={props.kurssi.osat[1]} />
      <Osa osa={props.kurssi.osat[2]} />
    </div>
  )
}

const Yhteensa = (props) => {
  return (
    <p>yhteensä {props.kurssi.osat[0].tehtavia + props.kurssi.osat[1].tehtavia + props.kurssi.osat[2].tehtavia} tehtävää</p>
  )
}


const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }


  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto kurssi={kurssi} />
      <Yhteensa kurssi={kurssi} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

