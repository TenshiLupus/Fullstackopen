import React from "react"

const Form = ({newName, number, addPersonHandler, personChangeHandler, numberChangeHandler}) => {
return (<form onSubmit={addPersonHandler}>
        <div>
          name: <input value={newName} onChange={personChangeHandler}/>
        </div>
        <div>number: <input value={number} onChange={numberChangeHandler}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default Form