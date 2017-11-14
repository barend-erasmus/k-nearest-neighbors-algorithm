const fs = require('fs');

function getData() {
    const rawData = fs.readFileSync('./src/data/student-mat.csv', 'utf-8');

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

    return data;
}


function kNN(data, newData, kFactor) {
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

    return result;
}

const data = getData();

const maxX = [].concat(data['yes']).concat(data['no']).map((x) => x.motherEducation).reduce(function (a, b) {
    return Math.max(a, b);
});

const maxY = [].concat(data['yes']).concat(data['no']).map((x) => x.fatherEducation).reduce(function (a, b) {
    return Math.max(a, b);
});

const kFactor = 3;

const colors = {
    yes: 'red',
    no: 'blue',
};

const arr = [];

for (let y = 0; y < maxY + 2; y++) {
    const row = [];
    for (let x = 0; x < maxY + 2; x++) {
        const result = kNN(data, {
            motherEducation: x,
            fatherEducation: y
        }, kFactor);

    
        row.push(Math.max(result['yes'], result['no']) === result['yes']? colors['yes'] : colors['no']);

    }

    arr.push(row);
}

console.log(arr);