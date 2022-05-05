const mqtt = require("mqtt");

exports.config = {
  client: mqtt.connect("mqtt://localhost:1883"),
  input: "cbor",
  topic: "ELECTRICITY/sensorOne",
  
};
