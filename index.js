// inspired by exercise 11
const csv = require("csv-parser");
const fs = require("fs");
const cbor = require('cbor-x');

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
  try {
    const data = await getData("./dataset/IOT-temp.csv");
    const total_data_points = Object.keys(data).length;

    for (let i=0; i<total_data_points; i++) {
      const old_datetime = data[i]["noted_date"];
      let reggie = /(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})/;
      let date_array = reggie.exec(old_datetime)
      
      let data_object = new Date(
        (+date_array[3]),
        (+date_array[2])-1,
        (+date_array[1]),
        (+date_array[4]),
        (+date_array[5])
      )
      
      const unix_timestamp = Date.parse(data_object)

      data[i]["noted_date"] = unix_timestamp;
    }

    const senml_json = [];
    for (let i=0; i<total_data_points; i++) {
      let empty_obj = {};
      if (i == 0) {
        empty_obj.bn = "sensor1";
        empty_obj.bt = data[i]["noted_date"];
        senml_json.push(empty_obj);

        empty_obj = {};
        empty_obj.u = "Cel";
        empty_obj.v = parseFloat(data[i]["temp"]);
        senml_json.push(empty_obj)
      } else {
        empty_obj.t = data[i]["noted_date"];
        empty_obj.v = data[i]["noted_date"];
        senml_json.push(empty_obj);

        empty_obj = {};
        empty_obj.u = "Cel";
        empty_obj.v = parseFloat(data[i]["temp"]);
        senml_json.push(empty_obj)
      }
    }

    //console.log(senml_json)

    let serializedBuffer = cbor.encode(senml_json);
    let deserializedBuffer = cbor.decode(serializedBuffer)
    //console.log(serializedBuffer);
    //console.log(deserializedBuffer);
  } catch (error) {
    console.error(error)
  }
  
 /* for (const item in data) {
    if (Object.hasOwnProperty.call(data, item)) {
      const element = data[item];
      console.log(element);
      await wait(1000);
    }
  }*/
}

async function cbortest() {
  const data = await getData("./dataset/household_power_consumption.csv")
  let encoder = new Encoder();
  console.log(encoder.encode(data))
}

load_data();