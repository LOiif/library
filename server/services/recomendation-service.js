const math = require('mathjs');
const bookService = require("./book-service");
const ratings = await bookService.getRatingBook('')

const numUsers = ratings.length;
const numItems = ratings[0].length;
const numFeatures = 3; // Количество скрытых факторов
const numIterations = 10; // Количество итераций
const lambda = 0.1; // Параметр регуляризации


let userFeatures = math.random([numUsers, numFeatures]);
let itemFeatures = math.random([numFeatures, numItems]);

function trainALS(ratings, userFeatures, itemFeatures, numIterations, lambda) {
    for (let iteration = 0; iteration < numIterations; iteration++) {
        for (let u = 0; u < numUsers; u++) {
            const itemFactors = math.multiply(itemFeatures, math.diag(ratings[u]));
            const lambdaI = math.multiply(lambda, math.identity(numFeatures));
            const updatedUserFeatures = math.multiply(
                math.inv(math.add(math.multiply(itemFactors, math.transpose(itemFeatures)), lambdaI)),
                math.multiply(itemFactors, ratings[u])
            );
            userFeatures[u] = updatedUserFeatures;
        }

        for (let i = 0; i < numItems; i++) {
            const userFactors = math.multiply(userFeatures, math.diag(math.column(ratings, i)));
            const lambdaI = math.multiply(lambda, math.identity(numFeatures));
            const updatedItemFeatures = math.multiply(
                math.inv(math.add(math.multiply(userFactors, math.transpose(userFeatures)), lambdaI)),
                math.multiply(userFactors, math.column(ratings, i))
            );
            itemFeatures = math.transpose(itemFeatures);
            itemFeatures[i] = updatedItemFeatures;
            itemFeatures = math.transpose(itemFeatures);
        }
    }
}


trainALS(ratings, userFeatures, itemFeatures, numIterations, lambda);

const predictedRatings = math.multiply(userFeatures, itemFeatures);

export function getRecommendationsForUser(userIndex, topN) {
    const userRatings = predictedRatings[userIndex];
    const recommendations = [];
    for (let i = 0; i < userRatings.length; i++) {
        recommendations.push({ item: i, rating: userRatings[i] });
    }
    recommendations.sort((a, b) => b.rating - a.rating);
    return recommendations.slice(0, topN);
}