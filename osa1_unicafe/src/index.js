import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Statistic = ({info, stat, lisa}) => <tr><td>{info}</td><td>{stat} {lisa}</td></tr>


const Statistics = ({hyva, huono, neutraali}) => {
  if (hyva + huono + neutraali === 0) return <p>Yhtään palautetta ei ole annettu.</p>  

  let keskiarvo = (hyva + huono*-1) / (hyva+huono+neutraali)
  let positiiviset = hyva / (hyva+huono+neutraali) * 100
  
  return (
    <table>
      <tbody>
        <Statistic info="hyvä" stat={hyva} />
        <Statistic info="neutraali" stat={neutraali} />
        <Statistic info="huono" stat={huono} />    
        <Statistic info="keskiarvo" stat={keskiarvo} />    
        <Statistic info="positiivisia" stat={positiiviset} lisa="%"/>
      </tbody>    
    </table>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  lisaaHyva = () => {
    this.setState({ hyva: this.state.hyva + 1 })
  }

  lisaaNeutraali = () => {
    this.setState({ neutraali: this.state.neutraali + 1 })
  }

  lisaaHuono = () => {
    this.setState({ huono: this.state.huono + 1 })
  }

  lisaaPalaute = (uusi) => {
    return () => this.setState(uusi)
  }


  render() {
    return (
      <div>
        <h2>Anna palautetta</h2>
        <Button handleClick={this.lisaaPalaute({hyva: this.state.hyva + 1})} text="hyvä"/>
        <Button handleClick={this.lisaaPalaute({neutraali: this.state.neutraali + 1})} text="neutraali"/>
        <Button handleClick={this.lisaaPalaute({huono: this.state.huono + 1})} text="huono"/>

        <h2>Statistiikka</h2>
        <Statistics hyva={this.state.hyva} huono={this.state.huono} neutraali={this.state.neutraali} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

