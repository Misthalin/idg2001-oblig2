const { input, topic, client } = require("./config.js").config;
const cbor = require("cbor-x");
const parser = require("xml2json");
const EXI4JSON = require("exificient.js");

const readMessage = (message) => {
  if (input == "json") {
    output = JSON.parse(message.toString());
  }
  if (input == "cbor") {
    output = cbor.decode(message);
  }
  if (input == "xml") {
    output = JSON.parse(parser.toJson(message.toString()));
  }
  if (input == "exi") {
    const messageString = message.toString();
    const array = messageString.split(",");
    output = EXI4JSON.parse(array);
  }
  //console.log(output.data);
  return output.data;
};
const messageTemplate = (sensor, topic) => {
  const { u, v, t, n } = sensor;
  let prefix, value, message;
  value = `${v}C`;
  if (u === "Cel") {
    prefix = "Temperature";
    if (v < 15) {
      message = "Turn up the heat!";
    }
    if (v > 15 && v < 20) {
      message = "Current temperature is good!";
    }
    if (v > 20) {
      message = "Turn down the heat!";
    }
  }
  return console.log(
    `
    -------------------------------------
    Topic: ${topic}
    -------------------------------------
    Sensor: ${n}
    ${prefix}: ${value}
    Time: ${t}
    Message: ${message}
    `
  );
};
client.on("message", (topic, message) => {
  messageTemplate(readMessage(message), topic);
  console.log(`
    -------------------------------------------------------
    After: ${Date.now()}
    -------------------------------------------------------
    `);
});
client.on("connect", () => {
  client.subscribe(topic);
});
