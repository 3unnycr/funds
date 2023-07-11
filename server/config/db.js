const mongoose = require("mongoose");

const connectDB = async (url) => {
  
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  console.log("Database Connected.");
};

module.exports = connectDB;
