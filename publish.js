const { input, client, topic } = require("./config").config;

client.on("connect", async() => {
  setInterval(() => {
    if (input !== "json") {
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
  
    const message = JSON.stringify(sensor)
    client.publish(topic, message);
    console.log("Message sent from sensorOne" + message);
    //console.log(topic);
  }, 600000);
});
