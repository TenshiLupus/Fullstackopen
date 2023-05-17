const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('bearer ')) {
		return authorization.replace('bearer ', '')
	}
	return null
}

notesRouter.get('/', async (request, response) => {
	const notes = await Note.find({}).populate('user', { username: 1, name: 1 })

	response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
	const note = await Note.findById(request.params.id)

	if (note) {
		response.json(note)
	} else {
		response.status(404).end()
	}
})

//Server-side-session verification would be an alternative to verify the token access right of a user
//Some compromise will ahve to be made, whether it is utilizing a lightweight database like redis, MongoDB or relational databases
//An alternative to using the "Authorization-header" is cookies, such that cookies are used for transferrin the auth token between the client and the server
notesRouter.post('/', async (request, response) => {
	const body = request.body
	const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
	if (!decodedToken) {
		return response.status(401).json({
			error: 'token invalid'
		})
	}

	const user = await User.findById(decodedToken.id)

	const note = new Note({
		content: body.content,
		important: body.important === undefined ? false : body.important,
		user: user.id,
	})

	const savedNote = await note.save()
	user.notes = user.notes.concat(savedNote._id)
	await user.save()

	response.json(savedNote)
})

notesRouter.delete('/:id', async (request, response) => {
	await Note.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

notesRouter.put('/:id', async (request, response, next) => {
	const body = request.body

	const note = {
		content: body.cotent,
		important: body.important,
	}

	Note.findByIdAndUpdate(request.params.id, note, { new: true })
		.then((updatedNote) => {
			response.json(updatedNote)
		})
		.catch((error) => next(error))
})

module.exports = notesRouter
