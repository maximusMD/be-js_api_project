const db = require('../db/connection')

function articleByID(id) {
    const queryString = `
    SELECT author, title, article_id, body, topic, created_at, votes, article_img_url
    FROM articles
    WHERE article_id = $1;
    ;`
    return db.query(queryString, [id])
    .then(({ rows }) => {
        return rows[0]
    })
}

module.exports = articleByID