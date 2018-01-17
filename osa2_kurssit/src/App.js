import React from 'react'
import Kurssi from './components/Kurssi'
import Otsikko from './components/Otsikko'

const App = ({kurssit}) => {
  return (
    <div>
      <Otsikko nimi="Opetusohjelma" />
      {kurssit.map(kurssi=> <Kurssi key={kurssi.id} kurssi={kurssi} />)}
    </div>
  )    
}

export default App