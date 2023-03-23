const express = require("express");
const router = express.Router();
const admin = require("../schemas/admin");

// Get all types
router.get("/", (req, res, next) => {
  admin.find((err, admin) => {
    if (err) return next(err);
    res.json(admin);
  });
});

router.get("/:id", (req, res, next) => {
  admin.findById(req.params.id, (err, admin) => {
    if (err) return next(err);
    res.json(admin);
  });
});

router.post("/", (req, res, next) => {
  admin.create(req.body, (err, admin) => {
    if (err) return next(err);
    res.json(admin);
  });
});

router.put("/:id", (req, res, next) => {
  admin.findByIdAndUpdate(req.params.id, req.body, (err, admin) => {
    if (err) return next(err);
    res.json(admin);
  });
});

router.delete("/:id", (req, res, next) => {
  admin.findByIdAndDelete(req.params.id, (err, admin) => {
    if (err) return next(err);
    res.json(admin);
  });
});

module.exports = router;
