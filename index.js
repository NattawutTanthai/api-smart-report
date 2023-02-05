const express = require("express");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();

const connect = require("./connect"); // Connect to database
const port = process.env.PORT || 3000;
const indexRouter = require("./routes/index");
const taskRouter = require("./routes/task");
const typeRouter = require("./routes/type");
const waitReportRouter = require("./routes/waitReport");

const app = express(); // Create express app

app.use(cors()); // Allow CORS
app.use(express.json()); // Parse JSON body
app.use(logger("dev")); // Log requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static(__dirname)); // Serve static files

// Routes
app.use("/", indexRouter);
app.use("/task", taskRouter);
app.use("/type", typeRouter);
app.use("/waitReport", waitReportRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port} \n http://localhost:${port}`);
});
