/*
Make sure to refactor the tests first before making any changes to the actual routes of the application

Test regression: Whenever the tests fail due to refactoring
Systemacity is key when developing tests
*/

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Note = require('../models/note')
const User = require('../models/user')

beforeEach(async () => {
	await Note.deleteMany({})

	await Note.insertMany(helper.initialNotes)

	// const noteObjects = helper.initialNotes.map(note => new Note(note))
	//returns an array of promises
	// const promiseArray = noteObjects.map(note => note.save())
	//transforms the array of promises into a single promise, and is resolved once all the promises in the array are resolved, the promises are all executed in parallel
	// const results = await Promise.all(promiseArray)

	console.log('Database has been reset')
})

//Adding 100000 ms as timeout limit is a heuristic solution for whenver timeout errors happen due to speed clogging

describe('when there is initially some notes saved', () => {
	test('notes are returned as json', async () => {
		await api
			.get('/api/notes')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	}, 100000)

	test('all notes are returned', async () => {
		const response = await api.get('/api/notes')

		expect(response.body).toHaveLength(helper.initialNotes.length)
	})

	test('a specific note is within the returned notes', async () => {
		const response = await api.get('/api/notes')

		const contents = response.body.map((r) => r.content)

		expect(contents).toContain('Browser can execute only JavaScript')
	})
})

describe('viewing a specific note', () => {
	test('succeeds with a valid id', async () => {
		const noteAtStart = await helper.notesInDb()

		const noteToView = noteAtStart[0]

		//The actual operation that's being tested
		const resultNote = await api
			.get(`/api/notes/${noteToView.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(resultNote.body).toEqual(noteToView)
	})

	test('fails with statuscode 404 if note does not exist', async () => {
		const validNonExistingId = await helper.nonExistingId()

		await api.get(`/api/notes/${validNonExistingId}`).expect(404)
	})

	test('fails with statuscode 400 if id is invalid', async () => {
		const invalidId = '5a3d5da59070081a82a3445'

		await api.get(`/api/notes/${invalidId}`).expect(400)
	})
})

describe('addition of a new note', () => {
	test('succeeds with valid data', async () => {
		const newNote = {
			content: 'async/await simplifies making async calls',
			important: true,
		}

		await api
			.post('/api/notes')
			.send(newNote)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		//retrieve the notes in the backend
		const notesAtEnd = await helper.notesInDb()
		expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

		//assetain that there is a content field that contains the string value
		const contents = notesAtEnd.map((n) => n.content)
		expect(contents).toContain('async/await simplifies making async calls')
	})

	test('fails if data with missing fields is being added', async () => {
		const newNote = {
			important: true,
		}

		await api.post('/api/notes').send(newNote).expect(400)

		const notesAtEnd = await helper.notesInDb()

		expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
	})
})

describe('deletion of a note', () => {
	test('a note can be deleted', async () => {
		const noteAtStart = await helper.notesInDb()
		const noteToDelete = noteAtStart[0]

		//The actual operation that's being tested
		await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

		const notesAtEnd = await helper.notesInDb()

		expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)

		const contents = notesAtEnd.map((r) => r.content)

		expect(contents).not.toContain(noteToDelete.content)
	})
})

describe('when there is initially one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({ username: 'root', passwordHash })

		await user.save()
	})

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map((u) => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('expected `username` to be unique')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})
