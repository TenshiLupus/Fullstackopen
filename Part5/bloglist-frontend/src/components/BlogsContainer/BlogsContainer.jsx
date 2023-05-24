import React from "react";
import Blog from "../Blog/Blog";

import LogoutButton from "../Buttons/LogoutButton/LogoutButton";
import BlogForm from "../BlogForm/BlogForm";

const BlogsContainer = ({ blogs, user, setUser, addBlog, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange}) => (
  
  <div>
    console.log(user)
    <h2>blogs</h2>
    <br/>
    <p>{user.name} Logged in <LogoutButton setUser={setUser}/> </p>

    <p>Create new</p>
    <BlogForm title={title} handleTitleChange={handleTitleChange} author={author} handleAuthorChange={handleAuthorChange} url={url} handleUrlChange={handleUrlChange} addBlog={addBlog}/>

    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
);

export default BlogsContainer;
