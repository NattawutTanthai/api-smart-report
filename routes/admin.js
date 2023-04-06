const express = require("express");
const router = express.Router();
const admin = require("../schemas/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Get all types
router.get("/", (req, res, next) => {
  admin.find((err, admin) => {
    if (err) return next(err);
    res.json(admin);
  });
});

router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  // Comparison
  const ck_username = await admin.findOne({ username: username });

  // Check if username already exists
  if (ck_username) return res.status(400).send("Username already exists");

  // Encrypt password
  encryptPassword = await bcrypt.hash(password, 10);
  req.body.password = encryptPassword;

  // Create new admin
  admin.create(req.body, (err, admin) => {
    if (err) return next(err);
    res.status(200).json(admin);
  });
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  // Comparison
  const adminCompar = await admin.findOne({ username });
  console.log(adminCompar);
  console.log("username", username);
  console.log("password", password);

  // Check if username not exists
  if (adminCompar == null)
    return res
      .status(400)
      .send("เกิดข้อผิดพลาด กรุณาลองใหม่ ไม่มีผู้ใช้งานนี้อยู่ในระบบ");

  if (username && bcrypt.compare(password, adminCompar.password)) {
    const Token = jwt.sign(
      {
        id: adminCompar._id,
        username: adminCompar.username,
        password: adminCompar.password,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "24h", // 1 Day
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token: Token,
    });
  } else {
    res.status(400).json("Login Failed");
  }
});

// Get by id
router.get("/:id", (req, res, next) => {
  admin.findById(req.params.id, (err, admin) => {
    if (err) return next(err);
    res.json(admin);
  });
});

//Add admin
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
