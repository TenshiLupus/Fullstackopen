import { useState, useEffect, useRef } from "react"

import LoginForm from "./components/LoginForm/LoginForm"
import BlogsContainer from "./components/BlogsContainer/BlogsContainer"
import Notification from "./components/Notification/Notification"
import Togglable from "./components/Toggable/Togglable"

import blogService from "./services/blogs"
import loginService from "./services/login"

const notificationTypes = {
	success: "success",
	error: "error",
	neutral: "neutral",
}

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [user, setUser] = useState(null)
	const [notificationMessage, setNotificationMessage] = useState(null)
	const [notificationType, setNoticationType] = useState(
		notificationTypes.neutral
	)

	//The page rerenders whenever it detects that blogs has been changed, even after the first render
	useEffect(() => {
		const retrieveBlogs = async () => {
			const blogs = await blogService.getAll()
			setBlogs(blogs)
		}

		retrieveBlogs().catch(console.error)
	}, [user])

	//if an existing users exists in localstorage, it should be set as the current user
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedUserJSON")
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const loginFormRef = useRef()
	const blogFormRef = useRef()

	const createNotification = (message, messageType) => {
		setNotificationMessage(message)
		setNoticationType(messageType)
		setTimeout(() => {
			setNotificationMessage(null)
			setNoticationType(notificationTypes.neutral)
		}, 5000)
	}

	const createBlog = async (blogObject) => {
		try {
			blogFormRef.current.toggleVisibility()
			//Heuristic solution to passing user name for the blog to render, consider refactoring
			const createdBlog = await blogService.create(blogObject)

			const updatedBlogs = blogs.concat({ ...createdBlog, user: user.username })
			console.log("UPDATED BLOGS AFTER CREATION: ", updatedBlogs)
			setBlogs(updatedBlogs)
			createNotification(
				`A new blog ${createdBlog.title} by ${createdBlog.author} was successfully created`,
				notificationTypes.success
			)
		} catch (error) {
			createNotification("Error creating the Blog", notificationTypes.error)
		}
	}

	const handlePasswordChange = (event) => {
		setPassword(event.target.value)
	}

	const handleUsernameChange = (event) => {
		setUsername(event.target.value)
	}

	//Sending the form information should respond with the logged user and set it as the current user in the browser
	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			//This will determine whether the user successfully logs in and is allowed to interface with the api
			const user = await loginService.login({ username, password })
			window.localStorage.setItem("loggedUserJSON", JSON.stringify(user))

			blogService.setToken(user.token)
			setUser(user)
			setUsername("")
			setPassword("")
			createNotification(
				"User successfully logged in",
				notificationTypes.success
			)
		} catch (exception) {
			createNotification("Wrong credentials", notificationTypes.error)
		}
		console.log("logging in with", username, password)
	}

	const loginForm = () => {
		return (
			<Togglable buttonLabel="Log in" ref={loginFormRef}>
				<LoginForm
					handleLogin={handleLogin}
					username={username}
					password={password}
					handleUsernameChange={handleUsernameChange}
					handlePasswordChange={handlePasswordChange}
				/>
			</Togglable>
		)
	}

	return (
		<div>
			<h1>Blogs</h1>
			<Notification
				message={notificationMessage}
				notificationType={notificationType}
			/>
			{user === null ? (
				loginForm()
			) : (
				<BlogsContainer
					blogs={blogs}
					setBlogs={setBlogs}
					user={user}
					setUser={setUser}
					createBlog={createBlog}
					blogFormRef={blogFormRef}
				/>
			)}
		</div>
	)
}

export default App
