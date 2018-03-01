const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

//const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  if (action.type==='VOTE') {
    const old = state.filter(a => a.id !==action.id)
    const voted = state.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1} ]
  }
  if (action.type === 'CREATE') {
    return [...state, { content: action.content, id: getId(), votes:0 }]
  }
  if (action.type === 'INIT_ANCEDOTES') {
    return action.data
  }

  return state
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT_ANCEDOTES',
    data
  }
}

export const anecdoteCreation = (content) => {
  return {
    type: 'CREATE', 
    content,
    id: getId(),
    votes: 0 
  }
}

export const voting = (id) => {
  return {
    type: 'VOTE',
    id 
  }
}

export default anecdoteReducer