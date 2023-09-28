import { useState } from "react"
import { useNavigate } from "react-router-dom"

import {useField} from "./../../hooks/AnecdoteForm"

const AnecdoteForm = ({addNew, notifyUser}) => {  
   
    // const [content, setContent] = useState('')
    // const [author, setAuthor] = useState('')
    // const [info, setInfo] = useState('')

    const {contentReset, ...content} = useField("text")                   
    const {authorReset, ...author} = useField("text")
    const {infoReset, ...info} = useField("text")
    const navigate = useNavigate()
  
    const resetFields = () => {
      contentReset()
      authorReset()
      infoReset()
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      notifyUser(`A new anecdote ${content.value} created`)
      navigate("/")
    }
  
    return (
  
      <section>
  
        <h2>create a new anecdote</h2>
        
        <form onSubmit={handleSubmit}>
          
          <div>
            content
            <input {...content}/>
          </div>
          
          <div>
            author
            <input {...author}/>
          </div>
          
          <div>
            url for more info
            <input {...info}/>
          </div>
          
          <button type="submit">create</button>
          <button type="button" onClick={resetFields}>reset</button>
        
        </form>
  
      </section>

    )
  
  }

export default AnecdoteForm