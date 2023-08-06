import React from "react"
import { useDispatch, useSelector} from "react-redux"
import { vote } from "../../reducers/anecdoteReducer"
import { notifyMessage,clearNotification } from "../../reducers/notificationReducer"
const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = [...useSelector(({filter, anecdotes}) => {
      if (filter === "ALL") {
        return anecdotes
      }
      return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    })]

    const increaseVote = (id) => {
        return vote(id)
    }

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
              dispatch(notifyMessage(`you voted for ${anecdote.content}`))
              dispatch(increaseVote(anecdote.id))
              setTimeout(() => dispatch(clearNotification()), 3000)
            }}>vote</button>
          </div>
        </div>
      )}
    </>
    )
}

export default Anecdotes