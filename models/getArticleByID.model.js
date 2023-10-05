const db = require('../db/connection')

function articleByID(id) {
    const queryString = `
    SELECT author, title, article_id, body, topic, created_at, votes, article_img_url,
    (SELECT COUNT(comment_id) FROM comments WHERE article_id = $1) AS comment_count
    FROM articles
    WHERE article_id = $1;
    ;`
    return db.query(queryString, [id])
    .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({status: 404, message: 'Not Found'})
        }
        return rows[0]
    })
}

module.exports = articleByID