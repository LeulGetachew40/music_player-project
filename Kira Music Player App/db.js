const mongoose = require("mongoose");

(async function connectToDb() {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  console.log(process.env.MONGODB_CONNECTION_STRING);
  console.log("DB CONNECTED");
})();
