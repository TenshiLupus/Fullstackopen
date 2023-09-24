import AnecdoteForm from "../AnecdoteForm/AnecdoteForm"
import AnecdoteList from "../AnecdoteList/AnecdoteList"


const Anecdotes = ({anecdotes}) => (
     <>
        <AnecdoteList anecdotes={anecdotes}/>
    </>
)

export default Anecdotes