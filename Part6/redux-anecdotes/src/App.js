import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Anecdotes from './components/Anecdotes/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm/AnecdoteForm'
import AnecdoteFilter from './components/AnecdoteFilter/AnecdoteFilter'
import Notification from './components/Notification/Notification'

import {initializeAnecdotes} from "./reducers/anecdoteReducer"

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    // (async () => {dispatch(setAnecdotes(await anecdotesService.getAll()))})();
    dispatch(initializeAnecdotes())
  },[dispatch])

  return (
    <div>
      <Notification/>
      <AnecdoteFilter/>
      <Anecdotes/>     
      <AnecdoteForm/>
    </div>
  )
}

export default App