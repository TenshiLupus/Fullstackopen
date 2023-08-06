import Anecdotes from './components/Anecdotes/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm/AnecdoteForm'
import AnecdoteFilter from './components/AnecdoteFilter/AnecdoteFilter'
import Notification from './components/Notification/Notification'

const App = () => {

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