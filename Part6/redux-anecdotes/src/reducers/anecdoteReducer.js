import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

//Expect object formatting to be done outside of this module, the reducer should only handle already formatted data.
const anecdoteSlice = createSlice({
  name: "anecdotesSlice",
  initialState,
  reducers: {
    vote(state, action) {
      const id = action.payload.id
      const anecdoteToVote = state.find(an => an.id === id)
      const changedAnecdote = {...anecdoteToVote, votes: anecdoteToVote.votes + 1}
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    },
    newAnecdote(state, action){
      const newAnecdote = action.payload
      state.push(newAnecdote)
    }
  }
})

// const anecdoteReducer = (state = initialState, action) => {
 
//   console.log(state);
//   console.log(action);
  
//   switch(action.type){
//     case "Vote":
//       const id = action.payload.id
//       const anecdoteToVote = state.find(an => an.id === id)
//       const changedAnecdote = {...anecdoteToVote, votes: anecdoteToVote.votes + 1}
//       return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
//     case "NewAnecdote":
//       return [...state, action.payload]
//     default:
//       return state
//   }
// }

export const vote = (id) => {
  return {
    type: "Vote",
    payload: {id}
  }
}

export const createAnecdote = (content) => {
  return {
    type: "NewAnecdote",
    payload: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export default anecdoteReducer