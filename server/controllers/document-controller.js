const documentService = require("../services/document-service")
class DocumentController {
    async getAllDocuments(req, res, next) {
        try {
            const data = await documentService.getAllDocuments();
            return res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async addDocument(req, res, next) {
        try {
            const {docData} = req.body;
            const data = await documentService.addDocument(docData);
            return res.json(data);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new DocumentController()