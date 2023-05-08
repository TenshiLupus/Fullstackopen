const mongoose = require('mongoose')
const supertest = require('supertest')
//imports the existing express application
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const listHelper = require('../utils/list_helper')
const testHelper = require('./testHelper')

//Promise.all() will execute the promises parallely, but if wanted in sequence, a normal for loop can be utilized
beforeEach(async () => {
	await Blog.deleteMany({})
	const blogObjects = testHelper.initialBlogs.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(note => note.save())
	const results = await Promise.all(promiseArray)
})

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of emptylist is zero', () => {
    const blogList = []
    expect(listHelper.totalLikes(blogList)).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes(testHelper.listWithOneBlog)).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(testHelper.initialBlogs)).toBe(36)
  })
})

describe('Blog that', () => {

  test('has the highest amount of like', () => {
    expect(listHelper.favoriteBlog(testHelper.initialBlogs)).toEqual(testHelper.initialBlogs[2])
  })

  test('with the most frequent author', () => {
    expect(listHelper.highestAuthorBlogs(testHelper.initialBlogs).author).toBe("Robert C. Martin")
  })

  test('has author with most likes in general', () => {
    expect(listHelper.mostLikes(testHelper.initialBlogs).author).toBe("Edsger W. Dijkstra")
  })

})

test('Requests all the blogs from the database', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(testHelper.initialBlogs.length)
})
  
test('identifier is properly formatted', async () => {
	const testBlog = await new Blog(testHelper.testBlog).save()
	expect(testBlog.id).toBeDefined() 
})
  
test('create a new blog in database', async () => {
	const blogToAdd = new Blog(testHelper.testBlog)
	await blogToAdd.save()
	const storedBlogs = await api.get('/api/blogs')
	expect(storedBlogs.body).toHaveLength(testHelper.initialBlogs.length + 1)
})
  
test('fills likes with default value', async () => {
	
	const incompleteBlog = {
		title: "van",
		author: "jhon",
		url: "ssjsjs@sjsjsjs.com"
	}

	const incompleteReturn = await api.post('/api/blogs').send(incompleteBlog).expect(201).expect('Content-Type', /application\/json/)
	expect(incompleteReturn.body.likes).toBeDefined()
})

test('bad request', async () => {
	const missingFieldsBlog = {
		url: "asdfa",
		likes: 5
	}

	const incompleteReturn = await api.post('/api/blogs').send(missingFieldsBlog).expect(400)

})

test('an item has been deleted with the given id', async () => {
	const initialBlogs = await Blog.find({})
    initialBlogs.map(b => b.toJSON())
	const blogInDatabase = initialBlogs[0]

	await api.delete(`/api/blogs/${blogInDatabase.id}`).expect(204)

	const blogs = await Blog.find({})
    blogs.map(b => b.toJSON())

	expect(blogs).toHaveLength(initialBlogs.length - 1)

})

afterAll(async () => {
	console.log('close connection to the database')
	await mongoose.connection.close()
  })