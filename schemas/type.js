const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
    name: String, // ชื่อประเภท
    code: String, // รหัสหน่วยงาน
});

module.exports = mongoose.model("type", typeSchema);
