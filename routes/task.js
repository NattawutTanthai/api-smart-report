const express = require("express");
const router = express.Router();
const task = require("../schemas/task");
const { default: axios } = require("axios");

const token_group = {
  token_bin: "mPowMUb0CtGMXW3GWdSkBCSjzVSyxWpl7IyIAvtvq4g",
  token_school: "EVb9MXEomIzpGRwQsBMuFDAfTnv3MhEDu7DPkFimwej",
  token_road: "b8PFtPNsdkb9uMy4UFydn11VHfKNI8iE7NlruulmfIK",
};

const ck_type = (data) => {
  if (data == "ขยะ") {
    return token_group.token_bin;
  } else if (data == "ถนน") {
    return token_group.token_road;
  } else if (data == "ห้องเรียน") {
    return token_group.token_school;
  }
};

// Get all tasks
router.get("/", (req, res, next) => {
  task.find((err, task) => {
    if (err) return next(err);
    res.json(task);
  });
});

router.post("/get/history", (req, res, next) => {
  const { user } = req.body;
  // console.log(user)
  task.find({ name: user, status: 2 }, (err, task) => {
    if (err) return next(err);
    res.json(task);
  });
});

router.post("/get/user", (req, res, next) => {
  const { user } = req.body;
  task.find({ name: user }, (err, task) => {
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
  const { name, type, address, detail } = req.body;
  var message =
    "มีการแจ้งปัญหา" +
    type +
    "\nรายละเอียด : " +
    detail +
    "\nผู้แจ้ง : " +
    name +
    "\nวันที่แจ้ง : " +
    new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" }) +
    "\nสถานที่ : " +
    address;
  axios
    .post(
      "https://notify-api.line.me/api/notify",
      {
        message: message,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + ck_type(type),
        },
      }
    )
    .then((response) => {
      console.log("ok notify");
    })
    .catch((error) => {
      console.log(error);
    });

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
