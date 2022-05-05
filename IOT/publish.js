const { input, client, topic } = require("./config").config;
const cbor = require("cbor-x");
const json2xml = require("json2xml");
const EXI4JSON = require("exificient.js");

client.on("connect", () => {
  if (input !== "json" && input !== "xml" && input !== "cbor" && input !== "exi") {
    client.end();
    return console.log("Choose JSON, XML, EXI or CBOR as your input type");
  }
  setInterval(() => {
    const sensor = {
      data: {
        n: "sensor",
        u: "Cel",
        v: Math.floor(Math.random() * 20),
        t: Date.now(),
      },
    };
    if (input == "json") {
      message = JSON.stringify(sensor);
    }
    if (input == "cbor") {
      message = cbor.encode(sensor);
    }
    if (input == "xml") {
      message = json2xml(sensor);
    }
    if (input == "exi") {
      const uint8Array = EXI4JSON.exify(sensor);
      message = uint8Array.toString();
    }
    console.log("Message sent from sensorOne: " + message);
    client.publish(topic, message);
  }, 5000);
});
