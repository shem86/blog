var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var articleSchema = new Schema({
    title:  String,
    author: { type: String, default: "Shem Mahluf" },
    body:   String,
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs:  Number
    },
    id: ObjectId,
    comments: [
        {
            person: String,
            comment:   String,
            date: { type: Date, default: Date.now },
            meta: {
                votes: Number
            },
            id: ObjectId
        }
    ]
});

module.exports = mongoose.model('Articles', articleSchema);
