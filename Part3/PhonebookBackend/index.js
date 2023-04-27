/* eslint-disable linebreak-style */
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const Person = require('./models/person')

// eslint-disable-next-line no-unused-vars
morgan.token('body', (request, response) => {
  return JSON.stringify(request.body)
})

const requestLogger = (request, response, next) => {
  console.log('Method', request.method)
  console.log('Path', request.path)
  console.log('Body', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({ error: 'malformatted id' })
  }else if(error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(requestLogger)

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body


  if(!number || !name){
    return response.status(400).json({
      error: 'one or more content is missing'
    })
  }

  const person = new Person({
    name,
    number
  })

  person.save().then( person => {
    response.json(person)
  }).catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.status(200).json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {

  Person.findById(request.params.id).then(person => {
    if(person){
      response.status(200).json(person)
    } else{
      response.status(404).end()
    }
  })
    .catch(error => next(error))

  // if(!foundPerson){
  //     return response.status(404).json({
  //         error: "the persons with the given id is missing from the list"
  //     })
  // }

  // response.send(foundPerson)
})

app.get('/info', (request, response, next) => {

  Person.find({}).then(persons => {
    response.status(200).send(`
        <p>Phonebook has info for ${persons.length} people</p>
        ${Date()}
    `)
  })
    .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
  const person = request.body
  const personId = request.params.id

  const updatedPerson = {
    name: person.name,
    number: person.number
  }

  Person.findByIdAndUpdate(personId, updatedPerson, { new: true })
    .then(updatedPerson => {
      response.status(204).json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {

  Person.findByIdAndDelete(request.params.id).then(response => {
    response.status(204).json({
      error: 'item has been deleted'
    })
  }).catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server has been initiated and listening on port ${PORT}`)
})
