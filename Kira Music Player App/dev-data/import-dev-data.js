const dotenv = require("dotenv");
dotenv.config({
  path: `${__dirname}/../config.env`,
});
const mongoose = require("mongoose");

const fs = require("fs");
const musicData = JSON.parse(
  fs.readFileSync(`${__dirname}/music.json`, "utf-8")
);

const musicModel = require(`${__dirname}/../models/musicModel`);
const models = ["music"];
const modelsDataObject = {
  music: {
    model: musicModel,
    data: musicData,
  },
};

(async function () {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("DB connected");
    models.forEach(async (model) => {
      await modelsDataObject[model].model.deleteMany();
      await modelsDataObject[model].model.create(modelsDataObject[model].data);
    });
  } catch (error) {
    console.log(error);
  }
})();
