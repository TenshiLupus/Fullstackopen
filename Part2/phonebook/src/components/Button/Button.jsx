import React from "react"

const Button = ({buttonHandler}) => {   
    return (
        <>
            <button onClick={buttonHandler}>Delete item</button>
        </>
    )
} 

export default Button