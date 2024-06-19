const BookModel = require('../models/book-model');
const BookDataModel = require('../models/book-data-model');
const ApiError = require("../exceptions/api-error");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const UserDto = require("../dtos/user-dto");
const tokenService = require("./token-service");
const UserModel = require("../models/user-model");
const {resolveAny} = require("dns");

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

    async ratingBook(userId, bookId, rating) {
        let book = await BookModel.findOne({bookId})

        if (!book) {
            book = await BookModel.create({bookId: bookId, comments: [], likes: 0, rating: []})
        }
        book.rating = book.rating.filter((el) => el.userId !== userId)
        console.log(book.rating)
        book.rating.push({userId, rating})
        book.save()
        return book
    }

    async getRatingBook(bookId) {
        console.log(bookId)
        let book = await BookModel.findOne({bookId})

        if (!book) {
            throw ApiError.BadRequest(`Такой книги нет`)
        }

        return book.rating
    }

    async getComments(bookId) {
        const book = await BookModel.findOne({bookId})

        if (!book) {
            throw ApiError.BadRequest(`Такой книги нет`)
        }

        return book.comments
    }

    async getAllBooks() {
        const books = await BookDataModel.find()
        if (!books) {
            throw ApiError.BadRequest(`Такая книга уже есть`)
        }
        return books
    }

    async getBooksByIds(ids) {
        let books = []
        for(let i = 0; i < ids.length; i++){
            let book = await BookDataModel.findOne({id: ids[i]})
            books.push(book)
        }
        return books
    }
    async getBooksUploadsByUserId(userId) {

        let books = await BookDataModel.find({uploadUserId: userId})
        return books
    }

    async addBook(bookData) {
        let book = await BookDataModel.findOne({id: bookData.id})

        if (book) {
            throw ApiError.BadRequest(`Такая книга уже есть`)
        }
        book = await BookDataModel.create(bookData)

        return book
    }
}

module.exports = new BookService()