const db = require('../db/connection')

function getAllComments (article_id) {
    const queryString = `
    SELECT comment_id, votes, created_at, author, body
    FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC;
    `
    return db.query(queryString, [article_id])
    .then(({ rows }) => {
        return rows
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = getAllComments