const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', (request,response) => {
    return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const requestLogger = (request, response, next) => {
    console.log("Method", request.method);
    console.log("Path", request.path);
    console.log("Body", request.body);
    console.log("---");
    next()
}
app.use(requestLogger)

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.post("/api/persons", (request, response) => {
    const personToAdd = request.body


    if(!personToAdd.number || !personToAdd.name){
        return response.status(400).json({
            error: "one or more content is missing"
        })
    }

    if(persons.find(person => person.name === personToAdd.name)){
        return response.status(400).json({
            error: "This user already exists in the registry"
        })
    }

    const person = {
        id: getRandomInt(1,2000),
        name: personToAdd.name,
        number: personToAdd.number
    }

    persons = persons.concat(person)
    response.json(person)
})

app.get("/", (request,response) => {
    response.send('<h1>hello World from phonebook backend</h1>');
})

app.get("/api/persons", (request, response) => {
    response.send(persons)
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const foundPerson = persons.find(person => person.id === id)

    if(!foundPerson){
        return response.status(404).json({
            error: "the persons with the given id is missing from the list"
        })
    }
    
    response.send(foundPerson)
})

app.get("/info", (request, response) => {
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        ${Date()}
    `)
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const filteredPersons = persons.filter(person => person.id !== id)
    persons = filteredPersons

    response.status(204).json({
        error: "item has been deleted"
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server has been initiated and listening on port ${PORT}`)
})
