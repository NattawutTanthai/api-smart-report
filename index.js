const express = require("express");
const cors = require("cors");
const logger = require("morgan");
var bodyParser = require('body-parser')

require("dotenv").config();

const connect = require("./connect"); // Connect to database
const port = 3333;
const indexRouter = require("./routes/index");
const taskRouter = require("./routes/task");
const typeRouter = require("./routes/type");
const waitReportRouter = require("./routes/waitReport");
const processRouter = require("./routes/process");
const successRouter = require("./routes/success");
const sentToRouter = require("./routes/sentTo");
const employeeRouter = require("./routes/employee");
const authRouter = require("./routes/auth");

const app = express(); // Create express app

app.use(cors()); // Allow CORS
// app.use(express.json()); // Parse JSON body
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(logger("dev")); // Log requests
app.use(express.static(__dirname)); // Serve static files
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use("/", indexRouter);
app.use("/task", taskRouter);
app.use("/type", typeRouter);
app.use("/waitReport", waitReportRouter);
app.use("/process", processRouter);
app.use("/success", successRouter);
app.use("/sentTo", sentToRouter);
app.use("/employee", employeeRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port} \n http://localhost:${port}`);
});
