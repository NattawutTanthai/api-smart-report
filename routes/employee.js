const verifyToken = require("../middleware/vertifyToken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const emp = require("../schemas/employee");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res, next) => {
  emp.find((err, emp) => {
    if (err) return next(err);
    res.status(200).json(emp);
  });
})

router.get("/:id", (req, res, next) => {
  const {id} = req.params; 
  emp.findOne({username : id}, (err, emp) => {
    if (err) return next(err);
    res.json(emp);
  });
});

router.post("/register", async (req, res, next) => {
  const { fname, username, password } = req.body;

  // Comparison
  const ck_fname = await emp.findOne({ fname: fname });
  const ck_username = await emp.findOne({ username: username });

  // Check if username already exists
  if (ck_username) return res.status(400).send("Username already exists");
  // Check if name already exists
  if (ck_fname) return res.status(400).send("Name already exists");

  // Encrypt password
  encryptPassword = await bcrypt.hash(password, 10);
  req.body.password = encryptPassword;

  // Create new employee
  emp.create(req.body, (err, emp) => {
    if (err) return next(err);
    res.status(200).json(emp);
  });
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  // Comparison
  const employee = await emp.findOne({ username });

  // Check if username exists
  if (username && bcrypt.compare(password, employee.password)) {
    const Token = jwt.sign(
      {
        id: employee._id,
        username: employee.username,
        password: employee.password,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "24h", // 5 minutes
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

module.exports = router;
