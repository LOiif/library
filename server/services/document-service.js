const DocumentModel = require('../models/document-model');
const ApiError = require("../exceptions/api-error");
class DocumentService {
    async getAllDocuments() {
        const doc = await DocumentModel.find()

        if (!doc) {
            throw ApiError.BadRequest(`Такой книги нет`)
        }

        return doc
    }

    async addDocument(docData) {
        let doc = await DocumentModel.findOne({id: docData.id})

        if (doc) {
            throw ApiError.BadRequest(`Такой документ уже есть`)
        }
        doc = await DocumentModel.create(docData)

        return doc
    }
}

module.exports = new DocumentService()