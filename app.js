const express = require('express')
const getTopics = require('./controllers/getTopics.controller')
const getAPI = require('./controllers/getAPI.controller')
const getArticleByID = require('./controllers/getArticleByID.controller')

const app = express()

app.get('/api/topics', getTopics)
app.get('/api', getAPI)
app.get('/api/articles/:article_id', getArticleByID)

app.all('/*', (req, res, next) => {
    res.status(404).send({message: 'Not Found'})
})

module.exports = app