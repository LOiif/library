const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({email})

        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтой ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4()

        const user = await UserModel.create({email, password: hashPassword, activationLink})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
        user.isActivated = true;
        await user.save()
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с такой почтой не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль')
        }

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async addFavourites(userID, bookID) {
        if (!userID) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userID);
        if (!user.favourites.includes(bookID)) {
            user.favourites.push(bookID)
            user.save()
        }
        return user
    }

    async getFavouritesIds(userID) {
        if (!userID) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userID);
        return user.favourites
    }

    async changeFavouriteStatus(userID, bookID) {
        if (!userID) {
            throw ApiError.UnauthorizedError();
        }
        let isFavourites = false;
        const user = await UserModel.findById(userID);
        if (!user.favourites.includes(bookID)) {
            isFavourites = true
            user.favourites.push(bookID)
            user.save()
        } else {
            isFavourites = false
            user.favourites = user.favourites.filter((el) => el !== bookID);
            user.save();
        }
        return {user, isFavourites}
    }

    async findFavourite(userID, bookID) {
        if (!userID) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userID);

        const result = user.favourites.includes(bookID);
        user.save()
        return result

    }
}

module.exports = new UserService()