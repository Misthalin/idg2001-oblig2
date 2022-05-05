const { input, client, sensor, topic } = require("./config").config;
client.on("connect", () => {
  if (input !== "json") {
    client.end();
    return console.log("Choose json as your input type");
  }
  if (input === "json") {
      message = JSON.stringify(sensor);
      console.log(message);
  }
  setInterval(() => {
    console.log("Message sent from sensorOne" + message);
    client.publish(topic, message);
    //console.log(topic);
  }, 10000);
});
