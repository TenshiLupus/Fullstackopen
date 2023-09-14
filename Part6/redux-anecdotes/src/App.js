// import { useEffect} from 'react'
// import { useDispatch } from 'react-redux'
import Anecdotes from './components/Anecdotes/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm/AnecdoteForm'
// import AnecdoteFilter from './components/AnecdoteFilter/AnecdoteFilter'
import Notification from './components/Notification/Notification'

// import {initializeAnecdotes} from "./reducers/anecdoteReducer"

// import notificationReducer from './reducers/notificationReducer'

const App = () => {

 

  return (
      <div>
        <Notification/>
        {/* <AnecdoteFilter/> */}
        <Anecdotes/>     
        <AnecdoteForm/>
      </div>
  )
  }
export default App