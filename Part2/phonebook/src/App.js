import { useState } from 'react'

const Names = ({persons}) => {
  return (
    <>
    <h2>Numbers</h2>
    <ul>
        {persons.map(person => <li key={person.name}>{person.name}</li>)}
    </ul>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const personChangeHandler = (event) => {
    setNewName(event.target.value)
  }

  const addPersonHandler = (event) => {
    event.preventDefault();
    console.log(newName)
    const newPerson = {
      name: newName
    }
    setPersons(persons.concat(newPerson));
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPersonHandler}>
        <div>
          name: <input value={newName} onChange={personChangeHandler}/>

        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Names persons={persons}/>
      <div>debug: {newName}</div>
    </div>

  )
}

export default App