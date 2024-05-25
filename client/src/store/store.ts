import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";
import UserService from "../services/UserService";
import BookService from "../services/BookService";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    isFavourite = false;

    loginError = null;
    registrationError = null;

    constructor() {
        makeAutoObservable(this);
    }

    setLoginError(val) {
        this.loginError = val;
    }

    setRegistrationError(val) {
        this.registrationError = val;
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    getUser() {
        return this.user;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response)
            this.setLoginError(null);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);

        } catch (e) {
            this.setLoginError(e.response?.data);
            console.log(e.response?.data?.message);
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            this.setRegistrationError(null);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);

        } catch (e) {
            this.setRegistrationError(e.response?.data);
            console.log(e.response?.data);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

    async addFavourites(userID: string, bookID: string) {
        try {
            const response = await UserService.addFavourites(userID, bookID);

        } catch (e) {
            this.setRegistrationError(e.response?.data);
            console.log(e.response?.data);
        }
    }

    async changeFavouriteStatus(userID: string, bookID: string) {
        try {
            const response = await UserService.changeFavouriteStatus(userID, bookID);

        } catch (e) {
            this.setRegistrationError(e.response?.data);
            console.log(e.response?.data);
        }
    }

    async findFavourite(userID: string, bookID: string) {
        try {
            const response = await UserService.findFavourite(userID, bookID);
            return response.data
        } catch (e) {
            this.setRegistrationError(e.response?.data);
            console.log(e.response?.data);
        }
    }

    async postComment(userId: string, bookId: string, comment: string) {
        try {
            const response = await BookService.postComment(userId, bookId, comment);
        } catch (e) {
            console.log(e.response?.data);
        }
    }

    async deleteComment(bookId: string, commentId: string) {
        try {
            const response = await BookService.deleteComment(bookId, commentId);
            return response.data
        } catch (e) {
            console.log(e.response?.data);
        }
    }

    async getComments(bookId: string) {
        try {
            const response = await BookService.getComments(bookId);
            return response.data
        } catch (e) {
            console.log(e.response?.data);
        }
    }
    async getAllBooks(){
        try {
            const response = await BookService.getAllBooks();
            return response.data
        } catch (e) {
            console.log(e.response?.data);
        }
    }

    async getFavourites(userID){
        try {
            const response = await UserService.getFavourites(userID);
            return response.data
        } catch (e) {
            console.log(e.response?.data);
        }
    }

    async addBook(bookData){
        try {
            const response = await BookService.addBook(bookData);
            return response.data
        } catch (e) {
            console.log(e.response?.data);
        }
    }
}
