var mongoose = require('mongoose');

// Setup schema
var switchSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, type: {
        type: String,
        required: true,
    }, actuation: {
        type: Number,
        required: true,
    }, bottom: {
        type: Number,
        required: true,
    }, travel: {
        type: Number,
        required: true,
    }
});

// Export switch model
var KeySwitch = module.exports = mongoose.model("switch", switchSchema);

module.exports.get = function (callback, limit) {
    KeySwitch.find(callback).limit(limit);
}
