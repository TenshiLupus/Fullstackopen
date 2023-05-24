import React from "react";


const loginForm = ({handleLogin, handlePasswordChange, handleUsernameChange, password, username}) => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={() => handleUsernameChange()}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={() => handlePasswordChange()}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  export default loginForm