const getAllUsers = require('../models/getUsers.model')

function getUsers(req, res, next) {
    getAllUsers().then((result) => {
        res.status(200).send({users: result})
    })
    .catch(err => {
        next(err)
    })
}

module.exports = getUsers