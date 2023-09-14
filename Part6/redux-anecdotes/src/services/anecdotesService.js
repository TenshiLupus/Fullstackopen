import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
      content: anecdote,
      id: getId(),
      votes: 0
    }
  }

const getAll = async () => {
    const response = await axios.get(baseUrl)
    console.log(response)
    return response.data
}

const createNewAnecdote = async (anecdote) => {
    console.log("Content to save", anecdote)
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const updateAnecdote = async (anecdote) => {
   console.log("Updating anecdote");
   const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
}

const anecdotesService = { getAll, createNewAnecdote, updateAnecdote}
export default anecdotesService