const moongoose = require("moongoose");

const connectDB = async (url) => {
  await moongoose.connect(url);

  console.log("Database Connected.");
};

module.exports = connectDB;
