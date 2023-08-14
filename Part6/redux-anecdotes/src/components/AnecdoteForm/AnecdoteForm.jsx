import { useDispatch } from "react-redux"
import { createAnecdote } from "../../reducers/anecdoteReducer"
import { notifyMessage } from "../../reducers/notificationReducer"
import anecdotesService from "../../services/anecdotesService"

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ""
		dispatch(notifyMessage(`Added anecdote ${content}`))
		await anecdotesService.createNewAnecdote(content)
		console.log("After anecdote service creation", content);
		dispatch(createAnecdote(content))
		console.log("after reducer creation");
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

