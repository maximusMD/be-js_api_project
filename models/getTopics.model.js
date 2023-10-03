const db = require('../db/connection')

function getAllTopics() {
    const queryString = "SELECT * FROM TOPICS"
    return db.query(queryString)
    .then((topics) => {
        return topics.rows
    })
}

module.exports = getAllTopics