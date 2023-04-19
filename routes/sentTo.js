const express = require("express");
const router = express.Router();
const task = require("../schemas/task");

router.get("/", (req, res, next) => {
  task.find({ status: 3 }, (err, task) => {
    if (err) return next(err);
    res.json(task);
  });
});

router.get("/count", (req, res, next) => {
  task
    .find({ sentFrom: { $exists: true } })
    .count()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
