import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const Statistiikka = () => {
  const stats = store.getState()
  const palautteita = stats.good + stats.ok + stats.bad

  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{ stats.good }</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{ stats.ok }</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{ stats.bad }</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{((stats.good + -1*stats.bad) / palautteita).toFixed(2)}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{ (100*stats.good / palautteita).toFixed(1) } % </td>
          </tr>
        </tbody>
      </table>

      <button onClick={e => store.dispatch({type: 'ZERO'})}>nollaa tilasto</button>
    </div >
  )
}


class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({type: nappi})
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
