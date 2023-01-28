const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
    name: String, // ชื่อประเภท
});

module.exports = mongoose.model("type", typeSchema);
