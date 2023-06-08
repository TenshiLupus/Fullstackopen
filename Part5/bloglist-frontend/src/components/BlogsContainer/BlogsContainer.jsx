import React from "react"

import Blog from "../Blog/Blog"
import LogoutButton from "../Buttons/LogoutButton/LogoutButton"
import BlogForm from "../BlogForm/BlogForm"
import Togglable from "../Toggable/Togglable"
import blogService from "../../services/blogs"

const BlogsContainer = ({ blogs, setBlogs, user, setUser, createBlog, blogFormRef }) => {

	const handleLikeIncrease = async (blog) => {
		const updatedLike = {
			...blog, likes: blog.likes + 1
		}

		console.log(updatedLike)
		console.log(blog.id)
		const updatedBlog = await blogService.update(blog.id, updatedLike)
		const updatedBlogs = blogs.filter(oldBlog => oldBlog.id !== blog.id)
		setBlogs((updatedBlogs.concat(updatedBlog)))
	}

	return (<div>
		{console.log(user)}
		<h2>blogs</h2>
		<br/>
		<p>{user.name} Logged in <LogoutButton setUser={setUser}/> </p>

		<Togglable buttonLabel="Create new blog" ref={blogFormRef}>
			<p>Create new</p>
			<BlogForm createBlog={createBlog}/>
		</Togglable>

		{/*Since we want to sort the items in descending order, the likes value of the second element needs to remain positive after subtraction to assert that the first value was smaller i.e b>a [a,b]*/}
		{blogs.sort((a,b) => b.likes-a.likes).map((blog) => (
			<Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} likeIncreaseHandler={handleLikeIncrease}/>
		))}
	</div>)

}

export default BlogsContainer
