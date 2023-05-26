import React from "react";

import Blog from "../Blog/Blog";
import LogoutButton from "../Buttons/LogoutButton/LogoutButton";
import BlogForm from "../BlogForm/BlogForm";
import Togglable from "../Toggable/Togglable";

const BlogsContainer = ({ blogs, user, setUser, createBlog, blogFormRef}) => {

  
  
  return (<div>
    {console.log(user)}
    <h2>blogs</h2>
    <br/>
    <p>{user.name} Logged in <LogoutButton setUser={setUser}/> </p>

    <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
      <p>Create new</p>
      <BlogForm createBlog={createBlog}/>
    </Togglable>

    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>)

};

export default BlogsContainer;
