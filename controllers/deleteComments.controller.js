const removeComments = require('../models/deleteComments.model')

function deleteComments(req, res, next) {
    const { comment_id } = req.params

    removeComments(comment_id).then(() => {
        res.sendStatus(204)
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = deleteComments