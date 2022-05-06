require("dotenv").config();

const aedes = require("aedes")();
const server = require("net").createServer(aedes.handle);
const port = 1888;
const mongoose = require("mongoose");
const { input } = require("./config").config;
const TemperatureModel = require("./temperatureModel");
const cbor = require("cbor-x");
const parser = require("xml2json");
const EXI4JSON = require("exificient.js");

server.listen(port, () => {
  console.log(`Aedes listening on port: ${port}`);
});

aedes.on("publish", async (packet) => {
  let payload = packet.payload.toString();
  const array = payload.split(",");
  let output;
  //console.log("Payload: " + payload);
  switch (input) {
    case "json":
      output = "{";
      break;
    case "xml":
      output = "<";
      break;
    case "cbor":
      output = "�";
      break;
    case "exi":
      output = "1";
      break;
  }
  if (payload.slice(0, 1) == output && !payload.includes("client")) {
    console.log(`
    -------------------------------------------------------
    Encode start: ${Date.now()}
    -------------------------------------------------------
    `);
    if (input == "json") {
      payload = await JSON.parse(payload);
    }
    if (input == "xml") {
      payload = await JSON.parse(parser.toJson(payload.toString()));
    }
    if (input == "cbor") {
      payload = await cbor.decode(packet.payload);
    }
    if (input == "exi") {
      payload = await EXI4JSON.parse(array);
    }
    console.log(`
    -------------------------------------------------------
    Encode done: ${Date.now()}
    -------------------------------------------------------
    `);

    const data = new TemperatureModel({ payload });
    await data.save();

    console.log(`
    -------------------------------------------------------
    Stored on server: ${Date.now()}
    -------------------------------------------------------
    `);
    console.log(`Payload [ ${input.toUpperCase()} ] is now saved as JSON in db`);
  }
});

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
connectDB();
