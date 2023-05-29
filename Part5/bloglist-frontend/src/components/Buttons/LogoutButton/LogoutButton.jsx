import React from "react"

const LogoutButton = ({ setUser }) => {
	return <button onClick={() => {
		setUser(null)
		window.localStorage.removeItem("loggedUserJSON")
	}}> LOG OUT </button>
}

export default LogoutButton