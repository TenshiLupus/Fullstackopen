import { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm/LoginForm'
import BlogsContainer from './components/BlogsContainer/BlogsContainer'
import Notification from './components/Notification/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const notificationTypes = {
  success: "success",
  error: "error",
  neutral: "neutral"
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNoticationType] = useState(notificationTypes.neutral)
  const [loginVisible, setLoginVisibility] = useState(false)

  useEffect(() => {

    const retrieveBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs( blogs )
    }

    retrieveBlogs().catch(console.error)
  }, [])

  //if an existing users exists in localstorage, it should be set as the current user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUserJSON')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createNotification = (message, messageType) => {
    setNotificationMessage(message);
      setNoticationType(messageType)
      setTimeout(() => {
        setNotificationMessage(null);
        setNoticationType(notificationTypes.neutral)
      }, 5000);
  }

  const addBlog = async (event) => {
    event.preventDefault();

    const noteObject = {
      title,
      author,
      url,
    };

    try {
    const createdBlog = await blogService.create(noteObject)
      setBlogs(blogs.concat(createdBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
      createNotification(`A new blog ${createdBlog.title} by ${createdBlog.author} was successfully created`, notificationTypes.success)
    } catch (error) {
      createNotification("Error creating the Blog", notificationTypes.error)
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleUsernameChange = (event) => {
    setUser(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  //Sending the form information should respond with the logged user and set it as the current user in the browser
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
		//This will determine whether the user successfully logs in and is allowed to interface with the api
    const user = await loginService.login({ username, password }); 
		window.localStorage.setItem(
			'loggedUserJSON', JSON.stringify(user)
		)

	  blogService.setToken(user.token)
      setUser(user);
      setUsername("");
      setPassword("");
      createNotification("User successfully logged in", notificationTypes.success)
    } catch (exception) {
      createNotification("Wrong credentials", notificationTypes.error)
    }
    console.log("logging in with", username, password);
  };

  const loginVisibility = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisibility(true)}>Log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm handleLogin={handleLogin} username={username} password={password} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange}/>
          <button onClick={() => setLoginVisibility(false)} >cancel</button>
        </div>

      </div> 
    )
  }

  return (  
    <div>
      <Notification message={notificationMessage} notificationType={notificationType}/>
      {user === null ? 
        loginVisibility()
      : 
      <BlogsContainer blogs={blogs} user={user} setUser={setUser} title={title} handleTitleChange={handleTitleChange} author={author} handleAuthorChange={handleAuthorChange} url={url} handleUrlChange={handleUrlChange} addBlog={addBlog}/>
      }
    </div>
  )
}

export default App