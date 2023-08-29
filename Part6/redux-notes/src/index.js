import React from 'react'
import ReactDOM from 'react-dom/client'
// import { createStore, combineReducers} from "redux"

import { Provider } from 'react-redux'
import App from './App';

import store from './store';


// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer
// })

// (async () => {
//   const notes = await noteService.getAll()
//   store.dispatch(setNotes(notes))
// })()

// (async () => {
//   const notes = await noteService.getAll()
//   notes.forEach(note => store.dispatch(appendNote(note)))
// })()


// const store = createStore(reducer)

// store.subscribe(() => console.log(store.getState()))
// store.dispatch(filterChange("IMPORTANT"))
// store.dispatch(createNote("combineReducers forms one reducer from many simple reducers"))



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);