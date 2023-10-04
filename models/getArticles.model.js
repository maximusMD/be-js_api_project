const db = require('../db/connection')

function getAllArticles(topic) {
    let queryString = `
    SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id`

    const topicQuery = []

    if (topic){
        queryString += ' WHERE articles.topic = $1 '
        topicQuery.push(topic)
    }
    queryString += 
    ` GROUP BY articles.author, articles.title, articles.article_id
    ORDER BY articles.created_at DESC;
    `
    return db.query(queryString, topicQuery)
    .then((articles) => {
        if (articles.rows.length === 0) {
            return Promise.reject({status: 404, message: 'Not Found'})
        }
        return articles.rows
    })
}

module.exports = getAllArticles