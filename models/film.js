const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FilmSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    studio: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    reviewer: {
        type: String,
        required: true
    },
    img: {
        data: Buffer,
        contentType: String
    }
},

{
     timestamps: true
});

module.exports = mongoose.model('Film', FilmSchema);