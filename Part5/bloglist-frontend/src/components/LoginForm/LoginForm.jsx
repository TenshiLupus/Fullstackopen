import React from "react";


const loginForm = ({handleLogin, handlePasswordChange, handleUsernameChange, password, username}) => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={(event) => handleUsernameChange(event)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={(event) => handlePasswordChange(event)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  export default loginForm