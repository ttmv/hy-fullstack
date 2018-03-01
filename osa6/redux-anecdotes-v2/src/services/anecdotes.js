import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(baseUrl, { content, votes: 0})
  return response.data
}

const updateVote = async (anecdote) => {
  const id = anecdote.id
  anecdote.votes++
  const url = `http://localhost:3001/anecdotes/${id}`
  const response = await axios.put(url, anecdote)
  return response.data
}

export default { getAll, createNew, updateVote }