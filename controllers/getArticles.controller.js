const getAllArticles = require("../models/getArticles.model")

function getArticles (req, res, next) {
    const { topic } = req.query
    if (topic === '') {
        res.status(400).send({ message: 'Bad Request' })
    }
    getAllArticles(topic).then((result) => {
        res.status(200).send({articles: result})
    })
    .catch(err => {
        next(err)
    })
}

module.exports = getArticles