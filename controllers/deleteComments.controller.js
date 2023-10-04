const removeComments = require('../models/deleteComments.model')

function deleteComments(req, res, next) {
    const { comment_id } = req.params

    removeComments(comment_id).then(() => {
        res.status(204).send({message: 'No Content'})
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = deleteComments