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

const createNewAnecdote = async (content) => {
    console.log("Content to save", content)
    const response = await axios.post(baseUrl, asObject(content))
    return response.data
}

const anecdotesService = { getAll, createNewAnecdote}
export default anecdotesService