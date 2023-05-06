import { useState, useEffect } from "react";

import Names from "./components/PersonList/PersonList";
import Form from "./components/Form/Form";
import personService from "./services/PersonService";
import Notification from "./components/Notification/Notification";
import Footer from "./components/Footer/Footer";

//within the lifetime of an application we are handling 2 data structures one persistent, and one volatile
const notificationTypes = {
  success: "success",
  error: "error",
  neutral: "neutral",
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(notificationTypes.neutral)
  
  // const [filteredPersons, setFilteredPersons] = useState(persons)

  useEffect(() => {
    console.log("effect");

    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        alert("could not retrieve the persons", error);
      });
  }, []);

  console.log("render", persons.length, "persons");

  const personChangeHandler = (event) => {
    setNewName(event.target.value);
  };

  const addPersonHandler = (event) => {
    event.preventDefault();
    console.log(newName);

    const newPerson = {
      name: newName,
      number: number,
    };

    const found = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase());

    const updateUser = (id) => {
        if(window.confirm("this person already exists overwrite existing number?")){
            const updatedPerson = {...newPerson, number}
            personService
                .replace(id, updatedPerson)
                .then(returnedPerson =>{
                    const updatedPersons = persons.filter(person => person.id !== id)   
                    setPersons([...updatedPersons, returnedPerson])

                    setNotificationMessage(
                      `User '${returnedPerson.name}' has been updated in server`
                    )
                    setNotificationType(notificationTypes.success)
                    setTimeout(() => {
                      setNotificationMessage(null)
                    }, 5000)
                    
                }).catch(e => {
                    setNotificationMessage(`User '${updatedPerson.name}' has already been removed from server`)
                    setNotificationType(notificationTypes.error)
                    setTimeout(() => {
                      setNotificationMessage(null)
                    }, 5000)
                })
        }
        else return 
    }

    const createUser = (newPerson) => {
        console.log("creating a new person");
        personService
          .create(newPerson)
          .then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson))
            setNotificationMessage(
              `User '${returnedPerson.name}' has been added to the server`
            )
            setNotificationType(notificationTypes.success)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          }).catch(error => {
            console.log(error)
            console.log(error.response.data.error)
            setNotificationMessage(error.response.data.error)
            setNotificationType(notificationTypes.error)
          })
    }

    found ? updateUser(found.id) : createUser(newPerson)

    setNewName("");
    setNumber("");
  };

  const numberChangeHandler = (event) => {
    setNumber(event.target.value);
  };

  const filterByPerson = (event) => {
    console.log(event);
    console.log("before", filterBy);
    const filterPerson = event.target.value;
    setFilterBy(filterPerson);
    console.log("after", filterPerson);
  };

  const filteredPersons = filterBy
    ? persons.filter((person) => {
        const result = person.name
          .toLowerCase()
          .includes(filterBy.toLowerCase());
        console.log("result: ", result);
        return result;
      })
    : persons;

  const buttonHandler = (id) => {
    console.log("button was pressed");
    
    if (window.confirm("Do you want to delete this item")) {
      personService
        .remove(id)
        .then(() => {
          const updatedPersons = persons.filter((person) => person.id !== id);
          setPersons(updatedPersons);
        })
        .catch((err) => {

        });
    } else {
      return;
    }
  };

  return (
    <div>
      <Notification message={notificationMessage} notificationType={notificationType}/>
      <div>
        Filter by <input value={filterBy} onChange={filterByPerson} />
      </div>
      <h2>Phonebook</h2>
      <Form
        newName={newName}
        number={number}
        addPersonHandler={addPersonHandler}
        personChangeHandler={personChangeHandler}
        numberChangeHandler={numberChangeHandler}
      />
      <Names persons={filteredPersons} buttonHandler={buttonHandler} />
      <Footer/>
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
