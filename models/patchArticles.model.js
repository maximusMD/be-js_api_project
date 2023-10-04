const db = require('../db/connection')
const getArticleByID = require('../models/getArticleByID.model')

function updateArticles (article_id, inc_votes) {
    return getArticleByID(article_id).then((article) => {
        if (!article){
            return null
        }

    article.votes += inc_votes
    const queryString = 'UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *'
    return db.query(queryString, [article.votes, article_id]).then(({ rows }) => {
        if (rows.length === 0) {
            return null
        }
        return rows[0]
        });
    })
}

module.exports = updateArticles