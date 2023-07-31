import { createSlice } from "@reduxjs/toolkit"

const anecdoteFilterSlice = createSlice({
    name: "anecdotesFilter",
    initialState: "ALL",
    reducers: {
        filterAnecdotes (state = "ALL", action) {
            return action.payload !== "ALL" ? action.payload : state
        }
    }
}) 

// const anecdoteFilterReducer = (state = "ALL", action) => {
//     //The returned Filter is utilized by the Selector hook in the Anecdotes component, rendering logic is implemented there
//     switch(action.type){
//         case "SET_FILTER":
//             return action.payload
//         default: 
//             return state
//     }
// }

// export const filterAnecdotes = filterQuery => {
//     return {
//         type: "SET_FILTER",
//         payload: filterQuery
//     }
// }

export const {filterAnecdotes} = anecdoteFilterSlice.actions
export default anecdoteFilterSlice.reducer