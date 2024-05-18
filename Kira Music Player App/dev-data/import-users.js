const dotenv = require("dotenv");
dotenv.config({
  path: `${__dirname}/../config.env`,
});
const mongoose = require("mongoose");

const fs = require("fs");

const usersData = JSON.parse(
  fs.readFileSync(`${__dirname}/users.json`, "utf-8")
);

const userModel = require(`${__dirname}/../models/usersModel.js`);
const models = ["users"];

const modelsDataObject = {
  users: {
    model: userModel,
    data: usersData,
  },
};

(async function () {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("DB connected");
    models.forEach(async (model) => {
      await modelsDataObject[model].model.deleteMany();
      if (model === "users") {
        await modelsDataObject[model].model.create(
          modelsDataObject[model].data,
          {
            validateBeforeSave: false,
          }
        );
      } else {
        await modelsDataObject[model].model.create(
          modelsDataObject[model].data
        );
      }
    });
  } catch (error) {
    console.log(error);
  }
})();
