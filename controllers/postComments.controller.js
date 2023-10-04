const createComments = require('../models/postComments.model')
const articleByID = require('../models/getArticleByID.model')

function postComments(req, res, next) {
    const { article_id } = req.params
    const { username, body} = req.body      
    articleByID(article_id).then((article) => {
        return createComments(username, body, article_id).then((comment) => {
            res.status(201).send({ comment })
        })
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = postComments