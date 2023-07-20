const mongoose = require('mongoose');

const CfdSchema = new mongoose.Schema({
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  amount: {type: mongoose.Types.Decimal128},
  roi: {type: mongoose.Types.Decimal128},
  withdrawals: {type: mongoose.Types.Decimal128},
  isReleased: Boolean,
  percent:  Number,
  isActive: Boolean,
  updated_at: Date,
  created_at: Date
});

CfdSchema.pre("save", async function(next){
  this.created_at = await Date.now();
  next();
});

const Cfd = mongoose.model("Cfd", CfdSchema);

module.exports = Cfd;
