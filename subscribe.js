const { input, topic, client } = require("./config.js").config;
const cbor = require('cbor-x');

const readMessage = (message) => {
  if (input == "json") {
    output = JSON.parse(message.toString());
  }
  if (input == "cbor") {
    output = cbor.decode(message);
  }
  //console.log(output.data);
  return output.data;
};
const messageTemplate = (sensor, topic) => {
  const { u, v, t, n } = sensor;
  let prefix, value, message;
  value = `${v}kWh`;
  if (u === "W") {
    prefix = "Consumption";
    if (v < 50) {
      message = "Current consumption is good";
    }
    if (v > 50) {
      message = "Please check your electricity consumption!";
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
});
client.on("connect", () => {
  client.subscribe(topic);
});
