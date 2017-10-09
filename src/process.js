// http://archive.ics.uci.edu/ml/datasets/Student+Performance
// http://archive.ics.uci.edu/ml/datasets.html?sort=nameUp&view=list

const fs = require('fs');

const rawData = fs.readFileSync('./data/student-mat.csv', 'utf-8');

const lines = rawData.split('\n');

const data = {
    yes: [],
    no: [],
};

for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    if (!line) {
        continue;
    }

    const splitedLine = line.split(';').map((x) => x.replace(/['"]+/g, ''));

    const motherEducation = parseInt(splitedLine[6]);
    const fatherEducation = parseInt(splitedLine[7]);

    const wantsHigherEducation = splitedLine[20];

    data[wantsHigherEducation].push({
        motherEducation,
        fatherEducation,
    });
}


const kFactor = 3;

const newData = {
    motherEducation: 1,
    fatherEducation: 4
};

let distances = [];

for (const category in data) {
    for (const categoryData of data[category]) {
        const x1 = categoryData.motherEducation;
        const y1 = categoryData.fatherEducation;

        const x2 = newData.motherEducation;
        const y2 = newData.fatherEducation;

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