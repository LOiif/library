import {getRecommendationsForUser} from "../services/recomendation-service";

class RecommendationController {
    async getRecommendationsForUser(req, res, next) {
        try {
            const {userId} = req.body;
            const data = await getRecommendationsForUser(userId);
            return res.json(data);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new RecommendationController();