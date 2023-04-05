import { useState, useEffect } from 'react'
import axios from 'axios'
import Names from './components/PersonList/PersonList'
import Form from './components/Form/Form'
import personService from './services/personService';


//within the lifetime of an application we are handling 2 data structures one persistent, and one volatile

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filterBy, setFilterBy] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  useEffect(() => {
    console.log('effect')

      personService.getAll().then(initialPersons => {
        console.log(initialPersons)
        setPersons(initialPersons)
        setFilteredPersons(initialPersons)
      })
      .catch(error => {
        alert("could not retrieve the persons")
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



    found ? alert(`${newName} already exists in the list`) :  personService.create(newPerson).then(returnedPerson => setFilteredPersons(persons.concat(returnedPerson)));

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