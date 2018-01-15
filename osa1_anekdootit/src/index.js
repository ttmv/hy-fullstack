import React from 'react'
import ReactDOM from 'react-dom'


const Anecdote = ({anecdote}) => <p>{ anecdote }</p>
const Votes = ({votes, selected}) => <p>has {votes[selected] || 0} votes </p>
const Button = ({handleClick, text}) =>  <button onClick={handleClick}>{text}</button>
const MostVoted = ({anecdotes, mostVoted}) => {
  if (mostVoted < 0) return (<div></div>)

  return (
    <div>
      <h2>Anecdote with most votes:</h2>
      <p>{anecdotes[mostVoted]}</p>
    </div>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [],
      mostVoted: -1
    }
  }

  changeAnecdote = () => {
    console.log(this.state.selected)
    this.setState({ selected: Math.floor(Math.random()*this.props.anecdotes.length) })
  }

  voteSelected = () => {
    console.log(this.state.votes)    
    let votes = this.state.votes.slice()
    if(votes[this.state.selected]) votes[this.state.selected]++
    else votes[this.state.selected] = 1

    this.updateMostVoted(votes)
    this.setState({ votes: votes })
  }
  
  updateMostVoted = (votes) => {
    //eniten ääniä tai eka niistä joilla yhtä paljon
    let ind = -1;
    let maxVotes = 0;
    for (let i = 0; i<votes.length; i++) {
      if (votes[i] && votes[i] > maxVotes) {
        ind = i;
        maxVotes = votes[i]
      }
    }
    
    if (ind>-1 && ind!==this.state.mostVoted) this.setState({ mostVoted: ind }) 
  }

  render() {
    return (
      <div>
        <Anecdote anecdote={this.props.anecdotes[this.state.selected]} />
        <Votes votes={this.state.votes} selected={this.state.selected} />
        <Button handleClick={this.voteSelected} text="vote" />
        <Button handleClick={this.changeAnecdote} text="next anecdote" />
        <MostVoted anecdotes={this.props.anecdotes} mostVoted={this.state.mostVoted} />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

