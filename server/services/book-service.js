const BookModel = require('../models/book-model');
const ApiError = require("../exceptions/api-error");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const UserDto = require("../dtos/user-dto");
const tokenService = require("./token-service");
const UserModel = require("../models/user-model");

class BookService {
    async postComment(userId, bookId, comment) {
        let book = await BookModel.findOne({bookId})
        if (!book) {
            book = await BookModel.create({bookId: bookId, comments: [], likes: 0, rating: []})
        }
        const commentId = Date.now() + userId
        book.comments.push({userId, comment, commentId})
        book.save()
        return book
    }

    async deleteComment(bookId, commentId) {
        const book = await BookModel.findOne({bookId})
        if (!book) {
            throw ApiError.BadRequest(`Такой книги нет`)
        }
        book.comments = book.comments.filter((el) => el.commentId !== commentId)
        book.save()
        return book.comments
    }

    async getComments(bookId) {
        const book = await BookModel.findOne({bookId})

        if (!book) {
            throw ApiError.BadRequest(`Такой книги нет`)
        }

        return book.comments
    }
}

module.exports = new BookService()