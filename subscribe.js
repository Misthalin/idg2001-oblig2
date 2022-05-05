const { input, topic, client } = require("./config.js").config;

const readMessage = (message) => {
  if (input == "json") {
    output = JSON.parse(message.toString());
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
});
client.on("connect", () => {
  client.subscribe(topic);
});
