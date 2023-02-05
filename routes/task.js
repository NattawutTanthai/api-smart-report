const express = require("express");
const router = express.Router();
const task = require("../schemas/task");

// Get all tasks
router.get("/", (req, res, next) => {
  task.find((err, task) => {
    if (err) return next(err);
    res.json(task);
  });
});

router.get("/:id", (req, res, next) => {
  task.findById(req.params.id, (err, order) => {
    if (err) return next(err);
    res.json(order);
  });
});

router.post("/", (req, res, next) => {
  task.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put("/:id", (req, res, next) => {
  task.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete("/:id", (req, res, next) => {
  task.findByIdAndDelete(req.params.id, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.patch("/:id", (req, res, next) => {
  task.findByIdAndUpdate(req.params.id, req.body, (err, task) => {
    if (err) return next(err);
    res.json(task);
  });
});

module.exports = router;
