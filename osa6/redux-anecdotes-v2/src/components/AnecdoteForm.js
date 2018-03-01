import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'


class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdotefield.value
    e.target.anecdotefield.value = ''

    const newAnecd = await anecdoteService.createNew(content)
    this.props.anecdoteCreation(newAnecd)
    this.props.setNotification(`"${content}" added`)    
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdotefield'/></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default connect(
  null, { anecdoteCreation }
)(AnecdoteForm)
