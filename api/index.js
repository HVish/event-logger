const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const eventRoutes = require("./events/controller");

const app = express();
const port = process.env.PORT || 5000;
const dbURI = process.env.DB_URI || "mongodb://127.0.0.1/event-logs";

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cors());
app.use(bodyParser.json());
app.use(eventRoutes);

// server health check
app.get("/ping", (req, res) => res.send("pong"));

async function start() {
  await mongoose.connect(dbURI, { useNewUrlParser: true });
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}

start();
