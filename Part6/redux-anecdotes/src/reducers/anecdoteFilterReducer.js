import { createSlice } from "@reduxjs/toolkit"


const anecdoteFilterSlice = createSlice({
    name: "anecdotesFilter",
    initialState: "ALL",
    reducers: {
        //The keys in the object will be used to generate action type constants
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

//Reduxtoolkit automatically generates the reducers and actions that correspond to the reducer
export const {filterAnecdotes} = anecdoteFilterSlice.actions
export default anecdoteFilterSlice.reducer