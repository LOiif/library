const {Schema, model} = require('mongoose')

const DocumentSchema = new Schema({
    id: {type: String, required: true, unique: true},
    title: {type: String},
    description: {type: String},
    img: {type: String},
    pdf: {type: String},
    uploadUserId: {type: String}
})

module.exports = model('Document', DocumentSchema)