const express = require('express')
const getTopics = require('./controllers/getTopics.controller')
const getAPI = require('./controllers/getAPI.controller')

const app = express()

app.use(express.json())

app.get('/api/topics', getTopics)
app.get('/api', getAPI)

app.all('/*', (req, res, next) => {
    res.status(404).send({message: 'Not Found'})
})

app.use((err, req, res, next) => {
    if (err.code = '22P02'){
        response.status(400).send({message: 'Bad Request'})
    }
    else if (err.status){
        res.status(err.status).send({message: err.message})
    }
})


module.exports = app