const endpoints = require('../endpoints.json')

function getAPI (req, res, next) {
    res.status(200).send({endpoints});
}

module.exports = getAPI