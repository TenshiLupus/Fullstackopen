import Person from "../Person/Person"

const Names = ({persons, buttonHandler}) => {
  
    return (
      <>
        <h2>Numbers</h2>
        <ul>
            {
            persons.map(person => {
              console.log(person.id);
              return (
                <Person key={person.id} person={person} buttonHandler={buttonHandler}/>
            )})
          }
        </ul>
      </>
    )
  }

export default Names
  