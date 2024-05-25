const {Schema, model} = require('mongoose')

const BookDataSchema = new Schema({
    id: {type: String, required: true, unique: true},
    kind: {type: String},
    etag: {type: String},
    selfLink: {type: String},
    volumeInfo: {type: Object},
    saleInfo: {type: Object},
    accessInfo: {type: Object}
})

module.exports = model('BookData', BookDataSchema)