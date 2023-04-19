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

router.post("/getByUser", (req, res, next) => {
  const { user } = req.body;
  task.find({name : user},(err, task) => {
    if (err) return next(err);
    res.json(task);
  });
});

router.get("/:id", (req, res, next) => {
  task.findById(req.params.id, (err, task) => {
    if (err) return next(err);
    res.json(task);
  });
});

router.get("/count/type", (req, res, next) => {
  task.aggregate(
    [{ $group: { _id: "$type", count: { $count: {} } } }],
    (err, task) => {
      if (err) return next(err);
      res.json(task);
    }
  );
});

//GET by Type
router.post("/getByType", (req, res, next) => {
  const { type, status } = req.body;
  task.find({ type: type, status: status }, (err, task) => {
    if (err) return next(err);
    res.json(task);
  });
});

router.post("/getSentFrom", (req, res, next) => {
  const { type } = req.body;
  task.find({ sentFrom: type }, (err, task) => {
    if (err) return next(err);
    res.json(task);
  });
});

router.post("/", (req, res, next) => {
  task.create(req.body, (err, task) => {
    if (err) return next(err);
    res.json(task);
  });
});

router.post("/:id", (req, res, next) => {
  task.findByIdAndUpdate(req.params.id, req.body, (err, task) => {
    if (err) return next(err);
    res.json(task);
  });
});

router.put("/:id", (req, res, next) => {
  task.findByIdAndUpdate(req.params.id, req.body, (err, task) => {
    if (err) return next(err);
    res.json(task);
  });
});

router.delete("/:id", (req, res, next) => {
  task.findByIdAndDelete(req.params.id, (err, task) => {
    if (err) return next(err);
    res.json(task);
  });
});

router.patch("/:id", (req, res, next) => {
  task.findByIdAndUpdate(req.params.id, req.body, (err, task) => {
    if (err) return next(err);
    res.json(task);
  });
});

module.exports = router;
