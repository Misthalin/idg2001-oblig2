const csv = require('csv-parser');
const fs = require('fs');

function getData(file) {
    let data = [];
    const iot_data = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(file)
        .on('error', error => {
            reject(error);
        })
        .pipe(csv())
        .on('data', (data) => iot_data.push(data))
        .on('end', () => {
            resolve(iot_data)
        });
    });
}

async function load_data() {
    try {
        const data = await getData('./dataset/household_power_consumption.csv');
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

load_data();