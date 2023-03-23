const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  fname: String, // ชื่อ
  lname: String, // นามสกุล
  username: String, // ชื่อผู้ใช้
  password: String, // รหัสผ่าน
  phone: String, // เบอร์ติดต่อ
});

module.exports = mongoose.model("admin", adminSchema);
