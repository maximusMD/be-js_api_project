const updateArticles = require('../models/patchArticles.model')

function patchArticles (req, res, next) {
    const article_id = req.params.article_id
    const {inc_votes} = req.body

    updateArticles(article_id, inc_votes).then((updatedArticle) => {
        res.status(200).send({ article: updatedArticle })
    })
    .catch(err => {
        next(err)
    });
}


module.exports = patchArticles