const Router = require('express').Router;
const userController = require('../controllers/user-controller')
const bookController = require('../controllers/book-controller')
const router = new Router();
const {body} = require('express-validator')

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
router.post('/get-comments', bookController.getComments)
router.post('/delete-comment', bookController.deleteComment)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', userController.getUsers)
router.get('/get-all-books', bookController.getAllBooks)

module.exports = router