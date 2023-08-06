import { useDispatch } from "react-redux"
import { createAnecdote } from "../../reducers/anecdoteReducer"
import { notifyMessage } from "../../reducers/notificationReducer"

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		console.log(content);
		event.target.anecdote.value = ""
		dispatch(notifyMessage(`Added anecdote ${content}`))
		dispatch(createAnecdote(content))
	}

	return (
    	<>
    	  	<h2>create new</h2>
    	  	<form onSubmit={addAnecdote}>
    	  	  	<div>
    	  	  	  	<input name="anecdote"/>
    	  	  	</div>
    	  	  	<button type="submit">create</button>
    	  	</form>
    	</>
  	)
}

export default AnecdoteForm

