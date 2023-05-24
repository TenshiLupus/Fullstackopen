const BlogForm = ({addBlog, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange}) => {
    return (
      <form onSubmit={addBlog}>
        <label htmlFor="title">Title: </label>
        <input id="title" value={title} onChange={handleTitleChange}/>
        <br/>
        <label htmlFor="author">Author: </label>
        <input id="author" value={author} onChange={handleAuthorChange}/>
        <br/>
        <label htmlFor="URL">URL: </label>
        <input id="URL" value={url} onChange={handleUrlChange}/>
        <br/>
        <button type="submit">Create</button>
      </form>
    )
}

export default BlogForm