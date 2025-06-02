const mongoose = require('mongoose');

function isValidObjectId(objectId) {
    return mongoose.isValidObjectId(objectId);
}

module.exports = {
    isValidObjectId
}