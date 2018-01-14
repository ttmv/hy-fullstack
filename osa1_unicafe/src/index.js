import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Statistic = ({info, stat, lisa}) => <p>{info}: {stat} {lisa}</p>


const Statistics = ({hyva, huono, neutraali}) => {
  let keskiarvo = (hyva + huono*-1) / (hyva+huono+neutraali)
  let positiiviset = hyva / (hyva+huono+neutraali) * 100
  return (
    <div>
      <h2>Statistiikka</h2>
      <div>
        <Statistic info="hyvä" stat={hyva} />
        <Statistic info="neutraali" stat={neutraali} />
        <Statistic info="huono" stat={huono} />    
        <Statistic info="keskiarvo" stat={keskiarvo} />    
        <Statistic info="positiivisia" stat={positiiviset} lisa="%"/>    
      </div>
      
    </div>
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


  render() {
    return (
      <div>
        <h2>Anna palautetta</h2>
        <Button handleClick={this.lisaaHyva} text="hyvä"/>
        <Button handleClick={this.lisaaNeutraali} text="neutraali"/>
        <Button handleClick={this.lisaaHuono} text="huono"/>
        
        <Statistics hyva={this.state.hyva} huono={this.state.huono} neutraali={this.state.neutraali} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

