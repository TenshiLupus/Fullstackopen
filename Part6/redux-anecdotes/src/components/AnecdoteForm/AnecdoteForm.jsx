import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
// import { createAnecdote } from "../../reducers/anecdoteReducer"
// import { notifyMessage } from "../../reducers/notificationReducer"
import anecdotesService from "../../services/anecdotesService"
import { useNotificationDispatch } from "../../contexts/NotificationContext"

const AnecdoteForm = () => {

	const queryClient = useQueryClient()
	const notificationDispatch = useNotificationDispatch()

  //#queryData parameter needs to be contained within an array
  const newNoteMutation = useMutation(anecdotesService.createNewAnecdote, {
    onSuccess: (newAnecdote) => {
		
      const anecdotes = queryClient.getQueryData(["anecdotes"])
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote))
    }
  })

	const addAnecdote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ""
		newNoteMutation.mutate({content, votes: 0}, {
			onSuccess: () => {
				notificationDispatch({
					type: "NOTIFICATION",
					payload: `you created anecdote with content: ${content}`
				})
				setTimeout(() => {
					notificationDispatch({ type: "CLEAR" })
				}, 5000)
			},
			onError: () => {
				notificationDispatch({
					type: "NOTIFICATION",
					payload: `anecdote creation requires a minimum of 5 chracters`
				})
				setTimeout(() => {
					notificationDispatch({ type: "CLEAR" })
				}, 5000)
			}
		})
	
		console.log("After anecdote service creation", content);
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

