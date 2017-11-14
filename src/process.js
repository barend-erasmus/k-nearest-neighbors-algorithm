// http://archive.ics.uci.edu/ml/datasets/Student+Performance
// http://archive.ics.uci.edu/ml/datasets/Online+News+Popularity
// http://archive.ics.uci.edu/ml/datasets.html?sort=nameUp&view=list

const fs = require('fs');
const path = require('path');

const rawData = fs.readFileSync(path.join(__dirname, 'data/OnlineNewsPopularity.csv'), 'utf-8');

const lines = rawData.split('\n');

const data = {
    lifestyle: [],
    entertainment: [],
    business: [],
    socialMedia: [],
    tech: [],
    world: [],
    none: [],
};

for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    if (!line) {
        continue;
    }

    const splittedLine = line.split(',').map((x) => x.replace(/['"]+/g, ''));

    const numberOfImages = parseInt(splittedLine[9]);
    const numberOfVideos = parseInt(splittedLine[10]);

    const category = parseInt(splittedLine[13]) === 1? 'lifestyle' : parseInt(splittedLine[14]) === 1? 'entertainment' : parseInt(splittedLine[15]) === 1? 'business' : parseInt(splittedLine[16]) === 1? 'socialMedia' : parseInt(splittedLine[17]) === 1? 'tech' : parseInt(splittedLine[18]) === 1? 'world' : 'none';
    
    data[category].push({
        numberOfImages,
        numberOfVideos,
    });
}

const newData = {
    numberOfImages: 10,
    numberOfVideos: 5,
};

function kNN(data, newData, kFactor) {
    
    let distances = [];
    
    for (const category in data) {
        for (const categoryData of data[category]) {
       
            const x1 = categoryData.numberOfImages;
            const y1 = categoryData.numberOfVideos;
    
            const x2 = newData.numberOfImages;
            const y2 = newData.numberOfVideos;
    
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


console.log(kNN(data, newData, 3));