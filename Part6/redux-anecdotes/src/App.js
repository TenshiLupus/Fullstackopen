import Anecdotes from './components/Anecdotes/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm/AnecdoteForm'
import AnecdoteFilter from './components/AnecdoteFilter/AnecdoteFilter'

const App = () => {

  return (
    <div>

      <AnecdoteFilter/>
      <Anecdotes/>     
      <AnecdoteForm/>
    </div>
  )
}

export default App