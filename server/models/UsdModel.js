const mongoose = require('mongoose');

const UsdSchema = new mongoose.Schema({
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  amount: {type: mongoose.Types.Decimal128},
  credit: {type: Boolean},
  detail: {type: String},
  created_at: Date
});

UsdSchema.pre("save", async function(next){
  this.created_at = await Date.now();
  next();
});

const Usd = mongoose.model("Usd", UsdSchema);

module.exports = Usd;
