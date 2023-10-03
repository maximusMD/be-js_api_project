const articleByID = require('../models/getArticleByID.model')

function getArticleByID(req, res, next) {
    const { article_id } = req.params
    
    articleByID(article_id).then((article) => {
        if (!article){
            res.status(404).send({message: 'Not Found'})
        }
        res.status(200).send({ article })
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = getArticleByID