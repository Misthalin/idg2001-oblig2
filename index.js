const csv = require("csv-parser");
const fs = require("fs");

function getData(file) {
  let data = [];
  const iot_data = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(file)
      .on("error", (error) => {
        reject(error);
      })
      .pipe(csv())
      .on("data", (data) => iot_data.push(data))
      .on("end", () => {
        resolve(iot_data);
      });
  });
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function load_data() {
  const data = await getData("./dataset/household_power_consumption.csv");
  for (const item in data) {
    if (Object.hasOwnProperty.call(data, item)) {
      const element = data[item];
      console.log(element);
      await wait(1000);
    }
  }
}

load_data();