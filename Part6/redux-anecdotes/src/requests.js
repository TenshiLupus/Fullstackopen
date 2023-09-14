import axios from "axios";

const baseUrl = "http://localhost:3001"

export const getAnecdotes = () => {
    return axios.get(`${baseUrl}/anecdotes`).then(res => res.data)
}

export const createAnecdote = (newAnecdote) => {
    return axios.post(`${baseUrl}/anecdotes`, newAnecdote).then(res => res.data)
}

export const updateVote = (anecdoteToUpdate) => {
    return axios.put(`${baseUrl}/anecdotes/${anecdoteToUpdate.id}`, anecdoteToUpdate).then(res => res.data)
}