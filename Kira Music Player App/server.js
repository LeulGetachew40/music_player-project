const app = require("./app.js");
const dotenv = require("dotenv");

dotenv.config({
  path: `${__dirname}/config.env`,
});

const port = process.env.PORT || 8080;
const db = require("./db.js");
app.listen(port, (err) => {
  if (process.env.ENVIRONMENT === "DEVELOPMENT")
    console.log(`Server is running on port ${port}`);
  else {
    console.log("Server Started!");
  }
});
