const db = require('../db/connection')
const getArticleByID = require('../models/getArticleByID.model')

function updateArticles (article_id, inc_votes) {
    if (inc_votes === undefined || typeof inc_votes !== 'number'){
        res.status(400).send({message: 'Bad Request'})
    } 
    return getArticleByID(article_id).then((article) => {
        if (!article){
            res.status(404).send({ error: 'Not Found' })
        }
        article.votes += inc_votes
        const queryString = 'UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *'
        return db.query(queryString, [article.votes, article_id]).then(({ rows }) => {
            return rows[0]
        });
    })
}

module.exports = updateArticles