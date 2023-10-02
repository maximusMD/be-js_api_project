const express = require('express')
const getTopics = require('./controllers/getTopics.controller')
const getAPI = require('./controllers/getAPI.controller')

const app = express()

app.get('/api/topics', getTopics)
app.get('/api', getAPI)

app.all('/*', (req, res, next) => {
    res.status(404).send({message: 'Not Found'})
})


module.exports = app