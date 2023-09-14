import React from "react"
// import { useDispatch, useSelector} from "react-redux"
// import { voteAnecdote } from "../../reducers/anecdoteReducer"
import { useNotificationDispatch } from "../../contexts/NotificationContext"
import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import anecdotesService from "../../services/anecdotesService"
// import { setNotificationMessage} from "../../reducers/notificationReducer"

const Anecdotes = () => {
    // const dispatch = useDispatch()
    const queryClient = useQueryClient()
    
    const notificationDispatch = useNotificationDispatch()
    const anecdoteVoteMutation = useMutation(anecdotesService.updateAnecdote, {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["anecdotes"]})
      }
    })
    // const anecdotes = [...useSelector(({filter, anecdotes}) => {

    //   if (filter === "ALL") {
    //     return anecdotes
    //   }
    //   return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    // })]

    // const increaseVotesOfAnecdote = (anecdote) => {
    //   return voteAnecdote(anecdote)
    // }

    const handleVote = async (anecdote) => {
      // dispatch(increaseVotesOfAnecdote(anecdote))

      anecdoteVoteMutation.mutate({...anecdote, votes: anecdote.votes + 1}, {
        onSuccess: () => {setNotificationforAnecdoteUpdate(anecdote,3)},
        onError: (error) => {notificationDispatch({type: "ERROR", payload: error})}
      })
    }

    const setNotificationforAnecdoteUpdate = (anecdote, seconds) => {
      notificationDispatch({type: "NOTIFICATION", payload: `you voted for ${anecdote.content}`})
      setTimeout(() => {notificationDispatch({type: "CLEAR"})},seconds * 1000)
    }

    const result = useQuery({
      queryKey: ["anecdotes"],
      queryFn: anecdotesService.getAll,
      refetchOnWindowFocus: false,
      retry: 1
    })
    console.log(JSON.parse(JSON.stringify(result)))
  
    if(result.isLoading){
      return (<section>
        loading data...
      </section>)
    }

    const anecdotes = result.data

    return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              handleVote(anecdote)
            }}>vote</button>
          </div>
        </div>
      )}
    </>
    )
}

export default Anecdotes