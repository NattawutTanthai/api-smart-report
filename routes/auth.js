const verifyToken = require("../middleware/vertifyToken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const emp = require("../schemas/employee");
const jwt = require("jsonwebtoken");

router.post("/", verifyToken , (req, res, next) => {
    res.status(200).json({message : "Auhtenticated!!!"});
})

module.exports = router;
