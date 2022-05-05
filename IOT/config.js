const mqtt = require("mqtt");
const port = 1883;
exports.config = {
  client: mqtt.connect(`mqtt://localhost:${port}`),
  input: "json",
  topic: "Temperature/sensorOne",
};
