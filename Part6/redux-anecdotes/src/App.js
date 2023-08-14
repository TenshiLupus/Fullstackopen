import { useEffect } from 'react'

import Anecdotes from './components/Anecdotes/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm/AnecdoteForm'
import AnecdoteFilter from './components/AnecdoteFilter/AnecdoteFilter'
import Notification from './components/Notification/Notification'
import anecdotesService from './services/anecdotesService'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {dispatch(setAnecdotes(await anecdotesService.getAll()))})();
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