const { input, client, topic } = require("./config").config;

client.on("connect", () => {
  if (input !== "json" && input !== "xml") {
    client.end();
    return console.log("Choose JSON or XML as your input type");
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
    if (input === "json") {
      message = JSON.stringify(sensor);
    }
    console.log("Message sent from sensorOne: " + message);
    client.publish(topic, message);
  }, 60000);
});
