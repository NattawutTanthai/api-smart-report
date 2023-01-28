const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: String, // ชื่อผู้ใช้
  detail: String, // รายละเอียดปัญหา
  phone: String, // เบอร์ติดต่อ
  type: String, // ประเภทปัญหา
  address: String, // ที่อยู่
  lat: Number, // ละติจูด
  lon: Number, // ลองติจูด
  imgStart: String, // รูปภาพเริ่มต้น
  imgEnd: String, // รูปภาพสิ้นสุด
  startDate_timeStamp: Number, // เวลาเริ่ม
  processDate_timeStamp: Number, // เวลากำลังดำเนินการ
  endDate_timeStamp: Number, // เวลาสิ้นสุด
  commentProcess: String, // ความคิดเห็นของผู้ดำเนินการ
  commentEnd: String, // ความคิดเห็นสิ้นสุด
  status: Number, // สถานะ 0=รอดำเนินการ, 1=กำลังดำเนินการ, 2=เสร็จสิ้น 3=ส่งต่อ
});

module.exports = mongoose.model("task", taskSchema);
