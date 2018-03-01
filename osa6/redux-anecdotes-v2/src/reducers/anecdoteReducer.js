import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  if (action.type==='VOTE') {
    const old = state.filter(a => a.id !==action.id)
    const voted = state.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1} ]
  } 

  if (action.type === 'CREATE') {
    return [...state, { content: action.data.content, id: action.data.id, votes:0 }]
  }

  if (action.type === 'INIT_ANCEDOTES') {
    return action.data
  }

  return state
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANCEDOTES',
      data: anecdotes
    })
  }
}

export const anecdoteCreation = (data) => {
  return {
    type: 'CREATE',
    data 
  }
}

export const voting = (id) => {
  return {
    type: 'VOTE',
    id 
  }
}

export default anecdoteReducer