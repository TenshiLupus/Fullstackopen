import { createSlice } from "@reduxjs/toolkit"

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]

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

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

//Alltough it may look that we are mutating state, The Immer library creates a new state behind the lines. Hence state remains unmutated
const noteSlice = createSlice({
  name: "notes", 
  initialState,
  reducers: {
    createNote(state, action) {
      const content = action.payload
      
      state.push({
        content, important: false, id: generateId()
      })
    },
    toggleImportanceOf(state, action) {
      const id = action.payload

      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange, 
        important: !noteToChange.important
      }

      console.log(JSON.parse(JSON.stringify(state)))

      return state.map(note => 
        note.id !== id ? note : changedNote
      )
    }
  },
})

export const { createNote, toggleImportanceOf } = noteSlice.actions

export default noteSlice.reducer