const Part = ({name, exercises}) => {
    return (
        <>
        <li>
            <p>{name} {exercises}</p>
            
        </li>
        </>
    )
}


const Header = ({name}) => {
    return (
        <>
            <h2>{name}</h2>
        </>
    )
}

const Content = ({parts}) => {
    
    const total = parts.reduce((acc, cv) => {
        
        console.log(cv);
        return (acc + cv.exercises) 
    }, 0)
    
    return (
        <>
            <ul>
                {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
            </ul>
            <p>{total}</p>
        </>
    )
}

const Course = ({course}) => {
    return (
        <>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
        </>
    )
}

export default Course