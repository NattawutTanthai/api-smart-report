const express = require("express");
const router = express.Router();
const task = require("../schemas/task");

router.get("/", (req, res, next) => {
  task.find({ status: 0 }, (err, task) => {
    if (err) return next(err);
    res.json(task);
  });
});

router.get("/count", (req, res, next) => {
  task.aggregate(
    [{ $match: { status: 0 } }, { $count: "count" }],
    (err, task) => {
      if (err) return next(err);
      res.json(task);
    }
  );
});

module.exports = router;
