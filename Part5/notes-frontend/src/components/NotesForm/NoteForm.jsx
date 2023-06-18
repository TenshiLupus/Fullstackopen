import { useState } from "react"

const NoteForm = ({ createNote }) => {

	const [newNote, setNewNote] = useState("")

	const handleNoteChange = (event) => {
		console.log(event.target.value)
		setNewNote(event.target.value)
	}

	const addNote = (event) => {
		event.preventDefault()

		createNote({
			content: newNote,
			important: true,
		})
		setNewNote("")
	}

	return (
		<div className="formDiv">
			<h2>Create a new note</h2>

			<form onSubmit={addNote}>
				<input
					value={newNote}
					onChange={(event) => handleNoteChange(event)}
					placeholder="write note content here"
				/>
				<button type="submit">save</button>
			</form>
		</div>
	)
}

export default NoteForm