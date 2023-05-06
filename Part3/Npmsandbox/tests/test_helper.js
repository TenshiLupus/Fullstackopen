const Note = require('../models/note')

//all async functions will return promises that will need to be resolved.

const initialNotes = [
	{
		content: 'HTML is easy',
		important: false
	},
	{
		content: 'Browser can execute only JavaScript',
		important: true
	}
]


const nonExistingId = async () => {
	const note = new Note({ content: 'willremovethissoon' })
	await note.save()
	await note.deleteOne()

	return note._id.toString()
}

const notesInDb = async () => {
	const notes = await Note.find({})
	return notes.map(note => note.toJSON())
}

module.exports = {
	initialNotes, nonExistingId, notesInDb
}

