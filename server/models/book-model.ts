const {Schema, model} = require('mongoose')

const BookSchema = new Schema({
    bookId: {type: String, required: true, unique: true},
    comments: {type: Array},
    likes: {type: Number},
    rating: {type: Array}
})

module.exports = model('Book', BookSchema)