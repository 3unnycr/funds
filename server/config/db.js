const moongoose = require("moongoose");

const connectDB = async () => {
  await moongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database Connected.");
};

module.exports = connectDB;
