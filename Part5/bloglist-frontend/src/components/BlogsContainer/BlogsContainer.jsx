import React from "react"

import Blog from "../Blog/Blog"
import LogoutButton from "../Buttons/LogoutButton/LogoutButton"
import BlogForm from "../BlogForm/BlogForm"
import Togglable from "../Toggable/Togglable"

const BlogsContainer = ({ blogs, setBlogs, user, setUser, createBlog, blogFormRef }) => {

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
			<Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs}/>
		))}
	</div>)

}

export default BlogsContainer
