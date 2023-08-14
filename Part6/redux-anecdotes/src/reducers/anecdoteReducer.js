import { createSlice } from "@reduxjs/toolkit"

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// const initialState = anecdotesAtStart.map(asObject)
// console.log(initialState)

//Expect object formatting to be done outside of this module, the reducer should only handle already formatted data.
const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(an => an.id === id)
      const changedAnecdote = {...anecdoteToVote, votes: anecdoteToVote.votes + 1}
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    },
    createAnecdote(state, action){
      const newAnecdote = asObject(action.payload)
      state.push(newAnecdote)
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      console.log("dispatched item", action.payload)
      return action.payload
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

// export const vote = (id) => {
//   return {
//     type: "Vote",
//     payload: {id}
//   }
// }

// export const createAnecdote = (content) => {
//   return {
//     type: "NewAnecdote",
//     payload: {
//       content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

export const {vote, createAnecdote, appendAnecdote, setAnecdotes} = anecdotesSlice.actions
export default anecdotesSlice.reducer