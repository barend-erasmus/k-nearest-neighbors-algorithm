// https://www.analyticsvidhya.com/blog/2015/08/learning-concept-knn-algorithms-programming/

const kFactor = 3;

const data = {
    energyDrink: [
        {
            sweetness: 8,
            fizziness: 9
        },
        {
            sweetness: 7,
            fizziness: 12
        }
    ],
    healthDrink: [
        {
            sweetness: 1,
            fizziness: 2
        },
        {
            sweetness: 2,
            fizziness: 3
        }
    ],
    softDrink: [
        {
            sweetness: 4,
            fizziness: 8
        },
        {
            sweetness: 5,
            fizziness: 8
        }
    ],
    hardDrink: [
        {
            sweetness: 2,
            fizziness: 1
        },
        {
            sweetness: 4,
            fizziness: 1
        }
    ],
};

const newData = {
    sweetness: 6,
    fizziness: 8
};

let distances = [];

for (const category in data) {
    for (const categoryData of data[category]) {
        const x1 = categoryData.sweetness;
        const y1 = categoryData.fizziness;

        const x2 = newData.sweetness;
        const y2 = newData.fizziness;

        const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

        distances.push({
            category,
            distance
        });
    }
}

distances.sort((a, b) => {
    return a.distance - b.distance;
});

distances = distances.splice(0, kFactor);

const result = {};

for (const category in data) {
    const categoryCount = distances.filter((x) => x.category === category).length;

    result[category] = categoryCount / kFactor * 100;
}

console.log(result);

