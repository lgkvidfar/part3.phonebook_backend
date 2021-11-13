const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
morgan.token('body', req =>  JSON.stringify(req.body))
app.use(morgan(':method :url :response-time ms :body'))

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
  ]

  app.get('/info', (request, response) => {
    response.send(`
    <h2> the phonebok has ${persons.length} entries </h2>
    <br> 
    <h3>${Date()} </h3>
    `)
  })
  
  app.get('/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(p => p.id))
      : 0
    return maxId + 1
  }

  app.post('/persons', (request, response) => {
    const body = request.body
    const nameList = persons.map(p => p.name)
    const numberList = persons.map(p => p.number)


    if (!body.name) {
        return response.status(400).json({ 
          error: 'name missing' 
        })
      } else if (nameList.includes(body.name)) {
        return response.status(400).json({
            error: "duplicate name"
        })
      }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }
  
  persons = persons.concat(person)
  response.json(person)
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
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})