const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require('../models/user');


blogRouter.get("/", async (request, response) => {
  
  const blogsInDatabase = await Blog.find({}).populate('user', {username: 1, name: 1})
  
  response.json(blogsInDatabase)
});

blogRouter.post("/", async (request, response) => {
  const body = request.body
  const requestUser = request.user
  
  if(!requestUser.id){
    return response.status(401).json({error: 'token invalid'})
  }
  const user = await User.findById(requestUser.id)

  console.log('USER: ', user)

  if(body.author === undefined || body.title === undefined){
    return response.status(400).end()
  }
  if(body.likes === undefined){
    request.body.likes = 0
  }

  // const usersInDatabase = await requestHelper.usersInDb()
  // const randomUserIndex = requestHelper.randomIndex(usersInDatabase)
  // const user = usersInDatabase[randomUserIndex]
  // console.log(usersInDatabase)
  // console.log(user)

  const newBlog = {
    ...body,
    user: user._id
  }

  // const originalUserInDatabase = await User.findById(user.id)

  const blog = await new Blog(newBlog).save();
  user.blogs = user.blogs.concat(blog._id)
  await user.save()



  console.log('DATABASE RESPONSE',blog)
  response.status(201).json(blog);

});

blogRouter.delete('/:id', async (request, response) => {
  const user = request.user
  console.log("THIS IS THE USER IN THE REQUEST", user)
  const blogToDelete = request.params.id
  
  const userId = user._id.toString()
  console.log('THIS IS THE ID OF THE USER', typeof userId)

  if(!user){
    return response.status(401).json({error: 'token invalid'})
  }

  const databaseUser = await User.findById(userId)
  const blog = await Blog.findById(blogToDelete)

  console.log("THIS IS THE BLOG: ",blog)
  if(blog.user.toString() === userId){
    console.log('ARE THE SAME USER')

    await Blog.findByIdAndRemove(blog.id)
    const filteredBlogs = databaseUser.blogs.filter(blogId => blogId.toString() !== blogToDelete)

    databaseUser.blogs = filteredBlogs
    await databaseUser.save()
  }

	response.status(204).end()
})

//trying to update the document wiht more fields than expected allegedly cast a castToObject exeption, consider investigating
blogRouter.put('/:id', async (request, response) => {
	const {author, title, url, likes} = request.body

	const blog = {author, title, url, likes}

  //We are not replacing the entire document, only updating the fields that are specified in the passed in object
	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})

	response.json(updatedBlog)
})

module.exports = blogRouter