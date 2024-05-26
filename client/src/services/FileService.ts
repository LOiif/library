import $api from "../http";
import {AxiosResponse} from 'axios';

export default class FileService {
    static async downloadFile(filename: string): Promise<AxiosResponse> {
        return $api.get(`/download/${filename}`, {params: {filename}, responseType: 'blob'})
    }
}
