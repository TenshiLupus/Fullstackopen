import { createSlice } from "@reduxjs/toolkit"
import noteService from "../services/notes"


// const initialState = [
//   {
//     content: 'reducer defines how redux store works',
//     important: true,
//     id: 1,
//   },
//   {
//     content: 'state of store can contain any data',
//     important: false,
//     id: 2,
//   },
// ]

//By default the state will be predefined array. The actions will replace the object state along the way.
// const noteReducer = (state = initialState, action) => {
//     switch(action.type) {
//         case "NEW_NOTE":
//             return [...state, action.payload]
//         case "TOGGLE_IMPORTANCE": 
//             const id = action.payload.id
//             const noteChange = state.find(note => note.id === id)
//             const changedNote = {...noteChange, important: !noteChange.important}
//             return state.map(note => note.id !== id ? note : changedNote)
//         default: 
//             return state
//     }
// }

//Actions are returned in form of objects

// const generateId = () => Number((Math.random() * 1000000).toFixed(0))

//Alltough it may look that we are mutating state, The Immer library creates a new state behind the lines. Hence state remains unmutated
const noteSlice = createSlice({
  name: "notes", 
  initialState: [],
  reducers: {
    toggleImportanceOf(state, action) {
      const id = action.payload

      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange, 
        important: !noteToChange.important
      }

      return state.map(note => 
        note.id !== id ? note : changedNote
      )
    },
    appendNote(state, action){
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }
  },
})

export const initializeNotes = () => {
  
  const setStateNotes = async dispatch => {
    const retrievedNotes = await noteService.getAll()
    dispatch(setNotes(retrievedNotes))
  }
  return setStateNotes
}

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export  const { toggleImportanceOf, appendNote, setNotes} = noteSlice.actions

export default noteSlice.reducer