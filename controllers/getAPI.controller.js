const endpoints = require('../endpoints.json')

function getAPI (req, res, next) {
    return res.status(200).send(endpoints);
}

module.exports = getAPI