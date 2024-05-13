import $api from "../http";
import {AxiosResponse} from 'axios';
import {IUser} from "../models/IUser";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }
    static async addFavourites(userID: string, bookID: string): Promise<AxiosResponse> {
        return $api.post('/add-favourites', {userID, bookID})
    }
}

