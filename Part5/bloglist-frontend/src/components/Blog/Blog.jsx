import { React, useState } from "react";
import blogService from "../../services/blogs";

const Blog = ({ blog, setBlogs, blogs}) => {
  const [detailed, setDetailMode] = useState(false);
  const buttonText = !detailed ? "detailed" : "Simple";

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLikeIncrease = async () => {
	const updatedLike = {
		...blog, likes: blog.likes + 1
	}

	console.log(updatedLike)
	console.log(blog.id)
	const updatedBlog = await blogService.update(blog.id, updatedLike)
	const updatedBlogs = blogs.filter(oldBlog => oldBlog.id !== blog.id)
	setBlogs((updatedBlogs.concat(updatedBlog)))
  };

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
          </div>
        )}
        <button
          onClick={(event) => {
            setDetailMode(!detailed);
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Blog;
