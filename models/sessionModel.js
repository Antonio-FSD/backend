const mongoose = require('mongoose');
const Schema = mongoose.Schema;             

const sessionSchema = new Schema({
    seats: Array,
    session: String,
    movie_id: String
});

module.exports = mongoose.model('Session', sessionSchema);