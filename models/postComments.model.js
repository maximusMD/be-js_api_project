const db = require('../db/connection')

function createComments (username, body, article_id) {
    const parsedID = parseInt(article_id)
    const queryString = `
    INSERT INTO comments (author, body, article_id)
    VALUES ($1, $2, $3)
    RETURNING *;
    `
    return db.query(queryString, [username, body, parsedID])
    .then(({ rows }) => {
        return rows[0];
    })
}

module.exports = createComments