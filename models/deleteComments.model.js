const db = require('../db/connection')

function removeComments(comment_id) {
    const queryString = 'DELETE FROM comments WHERE comment_id = $1'

    return db.query(queryString, [comment_id]).then((result) => {
    if (result.rowCount === 0) {
        return Promise.reject({ status: 404, message: 'Not Found' })
    }
    })
}

module.exports = removeComments