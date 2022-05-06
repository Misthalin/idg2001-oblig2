const { input, client, topic } = require("./config").config;
const cbor = require("cbor-x");
const json2xml = require("json2xml");
const EXI4JSON = require("exificient.js");

client.on("connect", () => {
  // Checks if the input type specified is valid (see config.js)
  if (input !== "json" && input !== "xml" && input !== "cbor" && input !== "exi") {
    client.end();
    return console.log("Choose JSON, XML, EXI or CBOR as your input type");
  }
  setInterval(() => { // Publishes a message every 10 minutes to the broker
    const sensor = {
      data: {
        n: "sensor",
        u: "Cel",
        v: randomNum(10, 28),
        t: Date.now(),
      },
    };
    // Checks input type in config.js and encodes to selected input type
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
    console.log("Message sent from sensor: " + message);
    client.publish(topic, message);
  }, 60000);
});

// Generates a random number between two values
const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
