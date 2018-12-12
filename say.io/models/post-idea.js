const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostIdeaSchema = new Schema({
    memberId: Number,
    title: String,
    datePublished: Date,
    status: String,
    genre: String,
    wordCount: Number,
    publication: [String]
})

module.exports = mongoose.model("PostIdea", PostIdeaSchema);