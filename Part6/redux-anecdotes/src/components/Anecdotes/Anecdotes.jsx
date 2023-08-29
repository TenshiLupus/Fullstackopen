import React from "react"
import { useDispatch, useSelector} from "react-redux"
import { voteAnecdote } from "../../reducers/anecdoteReducer"
import { notifyMessage,clearNotification } from "../../reducers/notificationReducer"
const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = [...useSelector(({filter, anecdotes}) => {
      if (filter === "ALL") {
        return anecdotes
      }
      return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    })]

    const increaseVotesOfAnecdote = (anecdote) => {
        return voteAnecdote(anecdote)
    }

    return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          {console.log("Whiting list iteration", anecdotes)}
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              dispatch(increaseVotesOfAnecdote(anecdote))
              dispatch(notifyMessage(`you voted for ${anecdote.content}`))
              setTimeout(() => dispatch(clearNotification()), 3000)
            }}>vote</button>
          </div>
        </div>
      )}
    </>
    )
}

export default Anecdotes