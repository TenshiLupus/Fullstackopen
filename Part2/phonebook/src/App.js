import { useState, useEffect } from 'react'
import axios from 'axios'
import Names from './components/PersonList/PersonList'
import Form from './components/Form/Form'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filterBy, setFilterBy] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])


  console.log('render', persons.length, 'persons')


  const personChangeHandler = (event) => {
    setNewName(event.target.value)
  }

  const addPersonHandler = (event) => {
    event.preventDefault();
    console.log(newName)

    const newPerson = {
      name: newName,
      number:number,
    }

    const found = persons.find(person => !person.name === newName)

    found ? alert(`${newName} already exists in the list`) :  setPersons(persons.concat(newPerson));

    setNewName('')
    setNumber('')
  }

  const numberChangeHandler = (event) => {
    setNumber(event.target.value) 
  }

  const filterByPerson = (event) => {
    console.log(event)
    console.log("before", filterBy)
    const filterPerson = event.target.value
    setFilterBy(filterPerson)
    console.log("after", filterPerson)
    
    const filteredPersons = filterPerson ? persons.filter((person) => { 
      const result = person.name.toLowerCase().includes(filterPerson.toLowerCase())
      console.log('result: ', result)
      return result
      
    }) : persons

    setFilteredPersons(filteredPersons)
    
  }


  return (
    <div>
        <div>
          Filter by <input value={filterBy} onChange={filterByPerson}/>
        </div>
      <h2>Phonebook</h2>
      <Form newName={newName} number={number} addPersonHandler={addPersonHandler} personChangeHandler={personChangeHandler} numberChangeHandler={numberChangeHandler}/>
      <Names persons={filteredPersons}/>
      <div>debug: {newName}</div>
    </div>

  )
}

export default App