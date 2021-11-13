require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
morgan.token('body', req =>  JSON.stringify(req.body))
app.use(morgan(':method :url :response-time ms :body'))

  app.get('/info', (request, response) => {
    Person.find({}).then(returned => {
      response.send(`
    <h2> the phonebok has ${returned.length} entries </h2>
    <br> 
    <h3>${Date()} </h3>
    `)
    })
  })
  
  app.get('/persons', (request, response) => {
    Person.find({}).then(returned => {
      response.json(returned)
    })
  })

  app.get('/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
  })

  app.post('/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({ 
          error: 'information missing' 
        })
      }

  const person = new Person({
    name: body.name,
    number: body.number
  })
  
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

  app.delete('/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  app.use(unknownEndpoint)
  
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})