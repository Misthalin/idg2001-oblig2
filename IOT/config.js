const mqtt = require("mqtt");
const port = 1888;
exports.config = {
  client: mqtt.connect(`mqtt://localhost:${port}`),
  input: "xml",
  topic: "Temperature/sensorOne",
};
