const userService = require('../services/user-service')
const bookService = require('../services/book-service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-error')

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password} = req.body
            const userData = await userService.registration(email, password);

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)

        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password);

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        try {

        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async addFavourites(req, res, next) {
        try {
            const {userID, bookID} = req.body;
            const user = await userService.addFavourites(userID, bookID)
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async getFavourites(req, res, next) {
        try {
            const {userID} = req.body;
            const favouritesIds = await userService.getFavouritesIds(userID)
            const favourites = await bookService.getBooksByIds(favouritesIds)
            return res.json(favourites.filter(el => el !== null))
        } catch (e) {
            next(e)
        }
    }
    async changeFavouriteStatus(req, res, next) {
        try {
            const {userID, bookID} = req.body;
            const {user, isFavourites} = await userService.changeFavouriteStatus(userID, bookID)
            const jsonUser = res.json(user)
            return {jsonUser, isFavourites}
        } catch (e) {
            next(e)
        }
    }
    async findFavourite(req, res, next) {
        try {
            const {userID, bookID} = req.body;
            const result = await userService.findFavourite(userID, bookID)
            return res.json(result)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()