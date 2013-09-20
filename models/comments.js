var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var commentSchema = new Schema({
    author: String,
    body:   String,
    date: { type: Date, default: Date.now },
    meta: {
        votes: Number
    },
    id: ObjectId
});

module.exports = mongoose.model('Comments', commentSchema);
