import { useState } from "react"

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")
	const [url, setUrl] = useState("")


	const addBlog = event => {
		event.preventDefault()

		createBlog({
			title,
			author,
			url,
		})

		setTitle("")
		setAuthor("")
		setUrl("")
	}

	const handleTitleChange = (event) => {
		setTitle(event.target.value)
	}

	const handleAuthorChange = (event) => {
		setAuthor(event.target.value)
	}

	const handleUrlChange = (event) => {
		setUrl(event.target.value)
	}

	return (
		<form onSubmit={addBlog}>
			<label htmlFor="title">Title: </label>
			<input id="title" value={title} onChange={event => handleTitleChange(event)}/>
			<br/>
			<label htmlFor="author">Author: </label>
			<input id="author" value={author} onChange={event => handleAuthorChange(event)}/>
			<br/>
			<label htmlFor="URL">URL: </label>
			<input id="URL" value={url} onChange={event => handleUrlChange(event)}/>
			<br/>
			<button type="submit">Create</button>
		</form>
	)
}

export default BlogForm