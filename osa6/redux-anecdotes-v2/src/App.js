import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { notificationSetting } from './reducers/notificationReducer'

class App extends React.Component {
  setNotification = (notification) => {
    this.props.store.dispatch(notificationSetting(notification))

    setTimeout(() => {
      this.props.store.dispatch(notificationSetting(''))
    }, 5000)
  }

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <AnecdoteList setNotification={this.setNotification}/>
        <AnecdoteForm setNotification={this.setNotification}/>
      </div>
    )
  }
}

export default App