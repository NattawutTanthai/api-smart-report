const mongoose = require("mongoose");

const connectionString = process.env.ATLAS_URI;
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
  .connect(connectionString)
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err));