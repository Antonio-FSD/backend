const mongoose = require('mongoose');
const Schema = mongoose.Schema;             

const movieSchema = new Schema({
    title: String,
    cover: String,
    director: String,
    genre: String,
    synopsis: String,
    trailer: String
});

module.exports = mongoose.model('Movie', movieSchema);

