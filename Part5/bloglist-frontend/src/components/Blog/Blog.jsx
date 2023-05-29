import { React, useState } from "react"
import blogService from "../../services/blogs"

const Blog = ({ blog, setBlogs, blogs }) => {
	const [detailed, setDetailMode] = useState(false)
	const buttonText = !detailed ? "detailed" : "Simple"

	const deleteBlog = async () => {
		try{
			await blogService.remove(blog.id)
			const blogsWithoutCurrent = blogs.filter(blogInList => blogInList.id !== blog.id)
			setBlogs(blogsWithoutCurrent)
		}catch(error) {
			console.log(error)
		}
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	}

	const handleLikeIncrease = async () => {
		const updatedLike = {
			...blog, likes: blog.likes + 1
		}

		console.log(updatedLike)
		console.log(blog.id)
		const updatedBlog = await blogService.update(blog.id, updatedLike)
		const updatedBlogs = blogs.filter(oldBlog => oldBlog.id !== blog.id)
		setBlogs((updatedBlogs.concat(updatedBlog)))
	}

	return (
		<div style={blogStyle}>
			<div>
				{!detailed ? (
					<>
						{blog.title} {blog.author}{" "}
					</>
				) : (
					<div>
						<p>{blog.title}</p>
						<a href={blog.url}>{blog.url}</a>
						<p>{blog.author}</p>
						<p>
							{blog.likes} <button onClick={() => {handleLikeIncrease()}}>Like</button>
						</p>
						<p>{blog.user.name}</p>
						<button onClick={() => {
							if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
								deleteBlog()
							}
						}}>Remove blog</button>
					</div>
				)}
				<button
					// eslint-disable-next-line no-unused-vars
					onClick={(event) => {
						setDetailMode(!detailed)
					}}
				>
					{buttonText}
				</button>
			</div>
		</div>
	)
}

export default Blog
