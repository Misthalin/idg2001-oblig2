const { input, client, topic } = require("./config").config;
const cbor = require('cbor-x');


client.on("connect", async() => {
  setInterval(() => {
    if (input !== "json" && input !== "cbor") {
      client.end();
      return console.log("Choose json as your input type");
    }

    

    const sensor = {
      data: {
        n: "sensorOne",
        u: "W",
        v: Math.floor(Math.random() * 150),
        t: Date.now(),
      },
    }

    let message = JSON.stringify(sensor)
    if (input == "cbor") {
      message = cbor.encode(sensor);
    }
    client.publish(topic, message);

    console.log("Message sent from sensorOne" + message);
    //console.log(topic);
  }, 10000);
});
