import React from "react";

const Person = ({person, buttonHandler}) => {
    return (<>
        <li>{person.name} : {person.number} <button type="button" onClick={() => buttonHandler(person.id)}>REMOVE ITEM</button></li>
    </>)
}



export default Person