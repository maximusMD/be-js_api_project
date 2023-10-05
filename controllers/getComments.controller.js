const getAllComments = require('../models/getComments.model')
const articleByID = require('../models/getArticleByID.model')

function getComments (req, res, next) {
    const { article_id } = req.params
    getAllComments(article_id).then((comments) => {
        res.status(200).send({ comments })
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = getComments