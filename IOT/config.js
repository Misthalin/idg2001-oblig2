const mqtt = require("mqtt");

exports.config = {
  client: mqtt.connect("mqtt://localhost:1883"),
  input: "exi",
  topic: "Temperature/sensorOne",
};
