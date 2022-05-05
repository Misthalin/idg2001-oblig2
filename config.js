const mqtt = require("mqtt");

exports.config = {
  client: mqtt.connect("mqtt://localhost:1883"),
  input: "json",
  topic: "ELECTRICITY/sensorOne",
  sensor: {
    data: {
      n: "sensorOne",
      u: "W",
      v: Math.floor(Math.random() * 150),
      t: Date.now(),
    },
  },
};
