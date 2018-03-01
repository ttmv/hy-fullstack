import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    //this.props.store.dispatch(anecdoteCreation(content))
    this.props.anecdoteCreation(content)
    e.target.anecdote.value = ''
    this.props.setNotification(`"${content}" added`)    
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default connect(
  null, { anecdoteCreation }
)(AnecdoteForm)
