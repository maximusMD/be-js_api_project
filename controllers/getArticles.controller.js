const getAllArticles = require("../models/getArticles.model")

function getArticles (req, res, next) {
    const { topic, sort, order } = req.query
    getAllArticles(topic, sort, order).then((result) => {
        res.status(200).send({articles: result})
    })
    .catch(err => {
        next(err)
    })
}

module.exports = getArticles