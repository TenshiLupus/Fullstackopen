import { createSlice } from "@reduxjs/toolkit"
import blogsService from "../services/blogs"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0,
	}
}

//Expect object formatting to be done outside of this module, the reducer should only handle already formatted data.
//Updates to the state should only be expected to be done from within the reducer
//Immer is being utilized to simplify the mutation of state without making changes directly to the current state
const blogsSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		createBlog(state, action) {
			const newAnecdote = asObject(action.payload)
			state.push(newAnecdote)
		},
		appendBlog(state, action) {
			state.push(action.payload)
		},
		setBlogs(state, action) {
			console.log("dispatched item", action.payload)
			return action.payload
		},
		updateBlog(state, action) {
			const changedAnecdote = action.payload
			return state.map((anecdote) => anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote)
		},
		deleteBlog(state, action) {
			const blogId = action.payload.id
			
		}
	},
})

export const { updateBlog, appendBlog, setBlogs } = blogsSlice.actions

//Thunk: delayed logic action.
//With redux thunk async action creators return thunk functions that are dispatched, just as normal actions, ""
export const initializeAnecdotes = () => {
	const retrieveBlogs = async (dispatch) => {
		const notes = await blogsService.getAll()
		dispatch(setBlogs(notes))
	}
	return retrieveBlogs
}

export const createBlog = (content) => {
	const createBlogThunk = async (dispatch) => {
		const newAnecdote = blogsService.create(content)
		dispatch(appendBlog(newAnecdote))
	}
	return createBlogThunk
}

//thunk functions create thunk action creators
export const voteAnecdote = (anecdoteToIncreaseVotes) => {
	const voteThunk = async (dispatch) => {

		const changedAnecdote = {
			...anecdoteToIncreaseVotes,
			votes: anecdoteToIncreaseVotes.votes + 1,
		}
		await blogsService.updateAnecdote(changedAnecdote.id, changedAnecdote)
		dispatch(updateBlog(changedAnecdote))
	}
	return voteThunk
}

export default blogsSlice.reducer