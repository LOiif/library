import $api from "../http";

export default class RecommendationService {
    static async getRecommendations(userId: string): Promise<any> {
        return userId !== 'test' ? '' : $api.get(`/get-recommendations/${userId}`, {params: {userId}, responseType: 'blob'})
    }
}