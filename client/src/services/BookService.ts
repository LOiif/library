import $api, {GOOGLE_API_KEY} from "../http";
import axios, {AxiosResponse} from 'axios';

const fetchData = uri => axios.get(uri).then(({data}) => data);
export default class BookService {

    static async postComment(userId: string, bookId: string, comment: string): Promise<AxiosResponse> {
        return $api.post('/post-comment', {userId, bookId, comment})
    }

    static async deleteComment(bookId: string, commentId: string): Promise<AxiosResponse> {
        return $api.post('/delete-comment', {bookId, commentId})
    }

    static async getComments(bookId: string): Promise<AxiosResponse> {
        return $api.post('/get-comments', {bookId})
    }

    static async getBookById(bookId: string): Promise<any> {
        return axios.get((`https://www.googleapis.com/books/v1/volumes/${bookId}?key=${GOOGLE_API_KEY}`)).then(({data}) => data)
    }

    static async addBook(bookData): Promise<any> {
        return $api.post('/add-book', {bookData})
    }
    static async getAllBooks(): Promise<AxiosResponse> {
        return $api.get('/get-all-books')
    }
    static async getBooksUploadsByUserId(userId): Promise<AxiosResponse> {
        return $api.get(`/get-books-uploads-by-userid/${userId}`, )
    }
}
