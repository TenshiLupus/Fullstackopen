
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

import { useState } from 'react'

import About from './components/About/About'
import Menu from './components/Menu/Menu'
import Footer from './components/Footer/Footer'
import Anecdotes from './components/Anecdotes/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm/AnecdoteForm'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [user, setUser] = useState(null)
  
  // const [notification, setNotification] = useState('')

  // const addNew = (anecdote) => {
  //   anecdote.id = Math.round(Math.random() * 10000)
  //   setAnecdotes(anecdotes.concat(anecdote))
  // }

  // const anecdoteById = (id) =>
  //   anecdotes.find(a => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }

  //   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  // }

  return (
    <Router>
      <h1>Software anecdotes</h1>
        <Menu user={user} setUser={() => setUser}/>
      <Routes>
        <Route path="/" element={<Anecdotes anecdotes={anecdotes} setAnecdotes={() => setAnecdotes}/>}/>
        <Route path="/create" element={<AnecdoteForm setAnecdotes={setAnecdotes}/>}/>
        <Route path="about" element={<About/>}/>
      </Routes>
    
      <Footer />
    </Router>
  )
}

export default App
