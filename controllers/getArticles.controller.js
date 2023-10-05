const getAllArticles = require("../models/getArticles.model")

function getArticles (req, res, next) {
    const { topic } = req.query
    getAllArticles(topic).then((result) => {
        res.status(200).send({articles: result})
    })
    .catch(err => {
        next(err)
    })
}

module.exports = getArticles