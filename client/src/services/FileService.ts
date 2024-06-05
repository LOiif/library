import $api from "../http";
import {AxiosResponse} from 'axios';

export default class FileService {
    static async downloadFile(filename: string): Promise<AxiosResponse> {
        return $api.get(`/download/${filename}`, {params: {filename}, responseType: 'blob'})
    }

    static async uploadFile(formData): Promise<AxiosResponse> {
        return $api.post(`/files/upload`, formData, {headers: {
                'Content-Type': 'multipart/form-data',
            }})
    }
    static async getFile(fileName): Promise<AxiosResponse> {
        return $api.get(`/files/get/${fileName}`,{responseType: 'arraybuffer'})
    }
}
