// import { useContext } from "react"
import { Link } from "react-router-dom"

const padding = {
    padding: 5
  }
  
const Menu = (
  // {user, setUser}
  ) => (
    <div>
        <Link style={padding} to="/anecdotes">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
        {/* {user
          ? <em>{user} logged in</em>
          : <Link style={padding} to="/login">login</Link>
        } */}
    </div>
)

export default Menu