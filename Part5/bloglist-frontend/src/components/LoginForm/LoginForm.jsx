import React from "react"
import PropTypes from "prop-types"

const loginForm = ({ handleLogin, handlePasswordChange, handleUsernameChange, password, username }) => (
	<form className="login-form" onSubmit={handleLogin}>
		<div>
        username
			<input
				id="username"
				type="text"
				value={username}
				name="Username"
				onChange={(event) => handleUsernameChange(event)}
			/>
		</div>
		<div>
        password
			<input
				id="password"
				type="password"
				value={password}
				name="Password"
				onChange={(event) => handlePasswordChange(event)}
			/>
		</div>
		<button id="login-button" type="submit">log in</button>
	</form>
)

loginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired,
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired
}

export default loginForm