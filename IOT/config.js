const mqtt = require("mqtt");
const port = process.env.PORT || 1883;
exports.config = {
  client: mqtt.connect(`mqtt://localhost:${port}`),
  input: "json",
  topic: "Temperature/sensorOne",
};
