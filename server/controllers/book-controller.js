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

    async getAllBooks(req, res, next) {
        try {
            const data = await bookService.getAllBooks();
            return res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async getBooksUploadsByUserId(req, res, next) {
        try {
            console.log(req.params)
            const userId = req.params.userId
            const data = await bookService.getBooksUploadsByUserId(userId);
            return res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async ratingBook(req, res, next) {
        try {
            const {userId, bookId, rating} = req.body;
            const book = await bookService.ratingBook(userId, bookId, rating)
            return res.json(book)
        } catch (e) {
            next(e)
        }
    }

    async getRatingBook(req, res, next) {
        try {
            const bookId = req.params.bookId
            const data = await bookService.getRatingBook(bookId);
            return res.json(data);
        } catch (e) {
            next(e)
        }
    }

    async addBook(req, res, next) {
        try {
            const {bookData} = req.body;
            const data = await bookService.addBook(bookData);
            return res.json(data);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new BookController()