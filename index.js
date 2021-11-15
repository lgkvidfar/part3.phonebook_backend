// come back here pre-eslint
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)
app.use(cors())

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
        .catch(error => {
            console.log('error info', error)
            response.status(500).end()
        })
})

app.get('/persons', (request, response) => {
    Person.find({}).then(returned => {
        response.json(returned)
    })
        .catch(error => {
            console.log('error /persons/', error)
            response.status(500).end()
        })
})

app.get('/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if(person) {
            response.json(person)
        } else {
            response.status(404).send({ error: 'id doesn\'t exist' }).end()
        }
    })
        .catch(error => next(error))
})

app.post('/persons', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => savedPerson.toJSON())
        .then(savedAndFormattedPerson => {
            response.json(savedAndFormattedPerson)
        })
        .catch(error => next(error))
})

app.put('/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.delete('/persons/:id', (request, response,next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).message(`${result}`).end()
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if(error.name ==='ValidationError') {
        return response.status(400).send({ error: error.message })
    }

    next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})