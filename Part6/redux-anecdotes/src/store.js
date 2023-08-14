import { configureStore } from '@reduxjs/toolkit'

import anecdoteFilterReducer from './reducers/anecdoteFilterReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteReducer from "./reducers/anecdoteReducer"

const store = configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      filter: anecdoteFilterReducer,
      notificationMessage: notificationReducer
    }
});



export default store