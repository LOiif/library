const Router = require('express').Router;
const userController = require('../controllers/user-controller')
const bookController = require('../controllers/book-controller')
const fileController = require('../controllers/file-controller')
const documentController = require('../controllers/document-controller')
const router = new Router();
const {body} = require('express-validator')
const upload = require("../configs/upload-config");
const express = require("express");

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 5, max: 32}),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/add-favourites', userController.addFavourites)
router.post('/add-book', bookController.addBook)
router.post('/find-favourite', userController.findFavourite)
router.post('/change-favourite-status', userController.changeFavouriteStatus)
router.post('/post-comment', bookController.postComment)
router.post('/add-document', documentController.addDocument)
router.post('/get-comments', bookController.getComments)
router.post('/delete-comment', bookController.deleteComment)
router.post('/rating-book', bookController.ratingBook)
router.post('/files/upload', upload.single('file'), fileController.uploadFile)
router.get('/files/get/:fileName', fileController.getFile)
router.get('/activate/:link', userController.activate)
router.get('/get-books-uploads-by-userid/:userId', bookController.getBooksUploadsByUserId)
router.get('/refresh', userController.refresh)
router.get('/users', userController.getUsers)
router.get('/get-all-books', bookController.getAllBooks)
router.get('/get-rating-book/:bookId', bookController.getRatingBook)
router.get('/get-all-documents', documentController.getAllDocuments)
router.get('/download/:filename', fileController.downloadFile)
router.put('/get-favourites', userController.getFavourites)

module.exports = router