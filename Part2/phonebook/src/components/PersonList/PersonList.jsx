import Person from "../Person/Person"

const Names = ({persons}) => {
  
    return (
      <>
      <h2>Numbers</h2>
      <ul>
          {persons.map(person => <Person key={person.name} name={person.name} number={person.number}/>)}
      </ul>
      </>
    )
  }

export default Names
  