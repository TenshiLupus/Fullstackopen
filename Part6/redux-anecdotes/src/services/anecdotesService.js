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
    const objectToSave = asObject(content)
    const response = await axios.post(baseUrl, objectToSave)
    return response.data
}

const updateAnecdote = async (id, content) => {
   console.log("Updating anecdote");
   const response = await axios.put(`${baseUrl}/${id}`, content)
}

const anecdotesService = { getAll, createNewAnecdote, updateAnecdote}
export default anecdotesService