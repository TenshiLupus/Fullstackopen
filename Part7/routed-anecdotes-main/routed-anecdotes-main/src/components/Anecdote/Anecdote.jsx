import { Link } from "react-router-dom"

const Anecdote = ({anecdote}) => {
    
    return (
        <article>
            <h2>{anecdote.content} by {anecdote.author}</h2>
            <p>has {anecdote.votes} votes</p>
            <p>For more info visit: <Link to={`${anecdote.info}`}>{anecdote.info}</Link></p>
        </article>
    )
}

export default Anecdote