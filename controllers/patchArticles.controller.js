const updateArticles = require('../models/patchArticles.model')
const getArticleByID = require('../models/getArticleByID.model')

function patchArticles (req, res, next) {
    const article_id = req.params.article_id
    const {inc_votes} = req.body
    if (inc_votes === undefined || typeof inc_votes !== 'number'){
        res.status(400).send({message: 'Bad Request'})
        // return
    }
    getArticleByID(article_id).then(article => {
        if (!article) {
        res.status(404).send({ error: 'Not Found' })
        // return Promise.resolve(null)
        } 
        return updateArticles(article_id, inc_votes)
    })
    .then((updatedArticle) => {
        if (updatedArticle === null) {
            res.status(404).send({ error: 'Not Found' });
        } 
        else {
            res.status(200).send({ article: updatedArticle });
        }
    })
    .catch(err => {
        next(err)
    });
}


module.exports = patchArticles