const aedes = require("aedes")();
const server = require("net").createServer(aedes.handle);
const port = 1883;
const mongoose = require("mongoose");
const { input } = require("./config").config;
const ElectricityModel = require("./electricityModel");
const cbor = require("cbor-x");
const parser = require("xml2json");
const EXI4JSON = require("exificient.js");

server.listen(port, () => {
  console.log(`Aedes listening on port: ${port}`);
});

aedes.on("publish", async (packet) => {
  let payload = packet.payload.toString();
  let output;

  switch (input) {
    case "json":
      output = "{";
      break;
    case "xml":
      output = "<";
      break;
    case "cbor":
      output = "<";
      break;
    case "exi":
      output = ""; //NOT SURE YET
      break;
  }
  if (payload.slice(0, 1) == output && !payload.includes("client")) {
    if (input == "json") {
      payload = JSON.parse(payload);
    }
    if (input == "xml") {
      payload = JSON.parse(parser.toJson(payload.toString()));
    }
    if (input == "cbor") {
      payload = cbor.decode(payload);
    }
    if (input == "exi") {
      payload = EXI4JSON.exify(sensor);
    }
    const data = new ElectricityModel({ payload });
    await data.save();
    console.log(`Payload [ ${input.toUpperCase()} ] is now saved as JSON in db`);
  }
});

mongoose
  .connect("mongodb://localhost:27017/idg2001-oblig2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.log(error));
