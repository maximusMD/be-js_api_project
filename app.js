const express = require('express')
const getTopics = require('./controllers/getTopics.controller')
const getAPI = require('./controllers/getAPI.controller')
const getArticleByID = require('./controllers/getArticleByID.controller')
const getArticles = require('./controllers/getArticles.controller')
const getComments = require('./controllers/getComments.controller')


const app = express()

app.get('/api/topics', getTopics)
app.get('/api', getAPI)
app.get('/api/articles/:article_id', getArticleByID)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id/comments', getComments)

app.all('/*', (req, res, next) => {
    res.status(404).send({message: 'Not Found'})
})

app.use((err, req, res, next) => {
    if (err.code === '22P02'){
        response.status(400).send({message: 'Bad Request'})
    }
    else if (err.status){
        res.status(err.status).send({message: err.message})
    }
    else {
        next(err)
    }
})

module.exports = app