const express = require("express");
const router = express.Router();
const type = require("../schemas/type");
const generateUniqueId = require("generate-unique-id");

// Get all types
router.get("/", (req, res, next) => {
  type.find((err, type) => {
    if (err) return next(err);
    res.json(type);
  });
});

router.get("/:id", (req, res, next) => {
  type.findById(req.params.id, (err, order) => {
    if (err) return next(err);
    res.json(order);
  });
});

router.post("/", (req, res, next) => {
  const { name } = req.body;
  const code = generateUniqueId({
    length: 6,
    useLetters: false,
  });
  type.create({ name: name, code: code }, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put("/:id", (req, res, next) => {
  type.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete("/:id", (req, res, next) => {
  type.findByIdAndDelete(req.params.id, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
