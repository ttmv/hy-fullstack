import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  if (action.type==='VOTE') {
    const old = state.filter(a => a.id !==action.data.id)
    const voted = state.find(a => a.id === action.data.id)

    return [...old, voted ]
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

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const data = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data   
    })
  }
}

export const voting = (anecdote) => {
  return async (dispatch) => {
    const data = await anecdoteService.updateVote(anecdote)
    dispatch({
      type: 'VOTE',
      data
    })  
  }
}

export default anecdoteReducer