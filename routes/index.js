const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send({ message: "Powered by Smart Report." });
  });

module.exports = app;