import React from 'react';


class App extends React.Component {
  vote = (id) => () => {
    this.props.store.dispatch({ type: 'VOTE', data: {id }})
  }

  addNew = (event) => {
    event.preventDefault()
    console.log(event.target.anecdote.value)
    this.props.store.dispatch({
      type: 'ADD_ANECDOTE',
      data: {
        content: event.target.anecdote.value,
        votes: 0
      }
    })

    event.target.anecdote.value = ''
  }

  render() {
    const anecdotes = this.props.store.getState().slice()
    anecdotes.sort((a1, a2) => a1.votes < a2.votes)

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id)} >vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addNew}>
          <div><input name="anecdote"/></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App