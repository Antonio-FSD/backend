const mongoose = require('mongoose');
const Schema = mongoose.Schema;                     

const genresSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Genre', genresSchema);

