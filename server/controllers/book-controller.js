const bookService = require('../services/book-service');

class BookController {
    async postComment(req, res, next) {
        try {
            const {userId, bookId, comment} = req.body;
            const book = await bookService.postComment(userId, bookId, comment)
            return res.json(book)
        } catch (e) {
            next(e)
        }
    }

    async deleteComment(req, res, next) {
        try {
            const {bookId, commentId} = req.body
            const comments = await bookService.deleteComment(bookId, commentId);
            return res.json(comments);
        } catch (e) {
            next(e)
        }
    }

    async getComments(req, res, next) {
        try {
            const {bookId} = req.body;
            const comments = await bookService.getComments(bookId);
            return res.json(comments);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new BookController()