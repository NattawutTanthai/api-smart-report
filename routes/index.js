const express = require("express");
const router = express.Router();
const type = require("../schemas/type");
const app = express();
app.get("/", (req, res) => {
    // res.send({ message: "Powered by Smart Report." });
    type.find((err, type) => {
        if (err) return next(err);
        res.json(type);
      });
  });

module.exports = app;