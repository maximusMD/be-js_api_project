const endpoints = require('../endpoints.json')

function getAPI (req, res, next) {
    console.log(endpoints);
    return res.status(200).json(endpoints);
}

module.exports = getAPI