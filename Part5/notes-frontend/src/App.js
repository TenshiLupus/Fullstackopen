import { useState, useEffect, useRef } from "react"

import noteService from "./services/notes"
import loginService from "./services/login"

import Note from "./components/Note/Note"
import Notification from "./components/Notification/Notification"
import LoginForm from "./components/LoginForm/LoginForm"
import NoteForm from "./components/NotesForm/NoteForm"
import Togglable from "./components/Toggable/Togglable"

import "./index.css"

const Footer = () => {
	const footerStyle = {
		color: "green",
		fontStyle: "italic",
		fontSize: 16,
	}
	return (
		<div style={footerStyle}>
			<br/>
			<em><p>Note app, Department of Computer Science, University of Helsinki 2023</p></em>
		</div>
	)
}

const App = () => {
	const [notes, setNotes] = useState([])
	const [showAll, setShowAll] = useState(true)
	const [errorMessage, setErrorMessage] = useState(null)
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [user, setUser] = useState(null)

	//When rerendering the component we want to retrieve all the store elements back into the browser
	useEffect(() => {
		console.log("effect")

		noteService.getAll().then((initialNotes) => setNotes(initialNotes))
	}, [])
	console.log(notes)

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			noteService.setToken(user.token)
		}
	}, [])

	const handleUsernameChange = (event) => {
		setUsername(event.target.value)
	}

	const handlePasswordChange = (event) => {
		setPassword(event.target.value)
	}

	const loginForm = () => {
		return (
			<div>
				<Togglable buttonLabel="log in">
					<LoginForm
						username={username}
						password={password}
						handleUsernameChange={handleUsernameChange}
						handlePasswordChange={handlePasswordChange}
						handleSubmit={handleLogin}
					/>
				</Togglable>
			</div>
		)
	}

	const noteFormRef = useRef()

	const noteForm = () => (
		<Togglable buttonLabel="new note" ref={noteFormRef}>
			<NoteForm createNote={addNote}></NoteForm>
		</Togglable>
	)

	const toggleImportanceOf = (id) => {
		const note = notes.find((n) => n.id === id)
		const changedNote = { ...note, important: !note.important }

		noteService
			.update(id, changedNote)
			.then((returnedNote) => {
				setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
			})
			// eslint-disable-next-line no-unused-vars
			.catch((error) => {
				setErrorMessage(
					`Note '${note.content}' was already removed from server`
				)
				setTimeout(() => {
					setErrorMessage(null)
				}, 5000)
				setNotes(notes.filter((n) => n.id !== id))
			})
	}

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			//This will determine whether the user successfully logs in and is allowed to interface with the api
			const user = await loginService.login({ username, password })
			window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user))

			noteService.setToken(user.token)
			setUser(user)
			setUsername("")
			setPassword("")
		} catch (exception) {
			setErrorMessage("Wrong credentials")
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
		console.log("logging in with", username, password)
	}

	console.log("render", notes.length, "notes")

	const addNote = async (noteObject) => {
		noteFormRef.current.toggleVisibility()
		const createdNote = await noteService.create(noteObject)
		setNotes(notes.concat(createdNote))
	}

	const notesToShow = showAll
		? notes
		: notes.filter((note) => note.important === true)

	return (
		<div>
			<h1>Notes</h1>
			<Notification message={errorMessage} />

			{/* Should either render the login form or notes form, based on the existence of the user */}
			{user === null ? (
				loginForm()
			) : (
				<div>
					<p>{user.name} logged in</p>
					{noteForm()}
				</div>
			)}
			<br />
			<div>
				<button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
				</button>
			</div>
			<ul>
				{notesToShow.map((note) => (
					<Note
						key={note.id}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
				))}
			</ul>

			<Footer />
		</div>
	)
}

export default App
