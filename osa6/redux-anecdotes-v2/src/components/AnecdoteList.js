import React from 'react'
import Filter from '../components/filter'
import { voting } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  handleClick = (a) => {
    return async () => {
      await this.props.voting(a)
      this.props.notify(`you voted "${a.content}"`, 3500)
      //this.props.setNotification(`you voted "${a.content}"`)
    }
  }

  render() {
    return (
      <div>
        <Filter />
        <h2>Anecdotes</h2>
        {this.props.anecdotesToShow
          .sort((a, b) => b.votes - a.votes).map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={this.handleClick(anecdote)}>
                 vote
                </button>
              </div>
            </div>
          )}
      </div>
    )
  }
}

const anecdotesToShow = (filter, anecdotes) => {
  return anecdotes
    .filter(a => a.content.toLowerCase().indexOf(filter.toLowerCase()) > -1)
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state.filter, state.anecdotes)
  }
}

export default connect(
  mapStateToProps,
  { voting, notify }
)(AnecdoteList)
