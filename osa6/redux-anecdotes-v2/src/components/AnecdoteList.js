import React from 'react'
import { voting } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  handleClick = (a) => {
    return () => {
      //this.props.store.dispatch(voting(a.id))
      this.props.voting(a.id)
      this.props.setNotification(`you voted "${a.content}"`)
    }
  }

  render() {
    const { anecdotes, filter } = this.props
    const filtered = anecdotes
      .filter(a => a.content.toLowerCase().indexOf(filter.toLowerCase()) > -1)
    return (
      <div>
        <h2>Anecdotes</h2>
        {filtered.sort((a, b) => b.votes - a.votes).map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    anecdotes: state.anecdotes
  }
}

export default connect(
  mapStateToProps,
  { voting }
)(AnecdoteList)
