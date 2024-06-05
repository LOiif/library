import $api from "../http";
import axios, {AxiosResponse} from 'axios';

export default class DocumentService {
    static async addDocument(docData): Promise<any> {
        return $api.post('/add-document', {docData})
    }
    static async getAllDocuments(): Promise<AxiosResponse> {
        return $api.get('/get-all-documents')
    }

}
