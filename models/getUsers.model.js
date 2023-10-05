const db = require('../db/connection')

function getAllUsers() {
    const queryString = "SELECT * FROM users"
    return db.query(queryString)
    .then((users) => {
        return users.rows
    })
}

module.exports = getAllUsers