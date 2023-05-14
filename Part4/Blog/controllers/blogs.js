const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require('../models/user');

blogRouter.get("/", async (request, response) => {
  
  const blogsInDatabase = await Blog.find({})
  
  response.json(blogsInDatabase)
});

blogRouter.post("/", async (request, response) => {
  const body = request.body
  
  const user = User.findById(body.userId)
  
  if(body.author === undefined || request.body.title === undefined){
    return response.status(400).end()
  }
  if(body.likes === undefined){
    request.body.likes = 0
  }
 
  const blog = await new Blog(request.body).save();
  console.log('DATABASE RESPONSE',blog)
  response.status(201).json(blog);

});

blogRouter.delete('/:id', async (request, response) => {
	const itemID = request.params.id
	await Blog.findByIdAndRemove(itemID)
	response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
	const body = request.body

	const blog = {...body}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
	response.json(updatedBlog)
})

module.exports = blogRouter