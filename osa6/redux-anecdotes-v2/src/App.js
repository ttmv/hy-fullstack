import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { notificationSetting } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'

class App extends React.Component {
  componentDidMount = async () => {
    this.props.initializeAnecdotes()
  }

  setNotification = (notification) => {
    this.props.notificationSetting(notification)

    setTimeout(() => {
      this.props.notificationSetting('')
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

export default connect(null, { initializeAnecdotes, notificationSetting })(App)