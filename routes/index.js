const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send({ message: "Smart Report API" });
  });

module.exports = app;