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
const noteReducer = (state = initialState, action) => {
    switch(action.type) {
        case "NEW_NOTE":
            return [...state, action.payload]
        case "TOGGLE_IMPORTANCE": 
            const id = action.payload.id
            const noteChange = state.find(note => note.id === id)
            const changedNote = {...noteChange, important: !noteChange.important}
            return state.map(note => note.id !== id ? note : changedNote)
        default: 
            return state
    }
}

//Actions are returned in form of objects

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice({
  name: "notes", 
  initialState,
  reducers: {
      

    }
  }
})

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId()
    }
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: { id }
  }
}

export default noteReducer