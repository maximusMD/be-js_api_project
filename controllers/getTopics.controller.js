
const getAllTopics = require("../models/getAllTopics.model")

function getTopics (req, res, next) {
    getAllTopics().then((result) => {
        res.status(200).send({topics: result});
    })
    .catch(err => {
        next(err);
    })
}

module.exports = getTopics