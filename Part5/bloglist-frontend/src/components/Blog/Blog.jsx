import { React, useState } from "react"
import blogService from "../../services/blogs"

const Blog = ({ blog, setBlogs, blogs, likeIncreaseHandler }) => {
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

	return (
		<div style={blogStyle}>
			<div className="blogContainer">
				{!detailed ? (
					<div>
						<p className="blog-title">{blog.title}</p> <p className="blog-author">{blog.author}{" "}</p>
					</div>
				) : (
					<div>
						<p className="blog-title">{blog.title}</p>
						<a className="blog-url" href={blog.url}>{blog.url}</a>
						<p className="blog-author">{blog.author}</p>
						<p className="blog-likes">{blog.likes} <button className="like-increase" onClick={() => {likeIncreaseHandler(blog)}}>Like</button></p>
						<p>{blog.user.name}</p>
						<button onClick={() => {
							if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
								deleteBlog()
							}
						}}>Remove blog</button>
					</div>
				)}
				<button className="detailMode"
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
