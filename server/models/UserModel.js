const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please provide a firstname"],
  },
  lastname: {
    type: String,
    required: [true, "Please provide a lastname"],
  },
  mobileno: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email"
    ]
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: [6, "Password should be minimum 6 character"],
    select: false,
  },
  email_verified_at: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  created_at: Date,
  updated_at: Date
});



UserSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  this.created_at = await Date.now();
  this.updated_at = await Date.now();
  next();
});

UserSchema.methods.matchPassword = async function(password){
  return await bcrypt.compare(password, this.password);
}

UserSchema.methods.getSignedToken = function(){
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE})
}
UserSchema.methods.getResetPasswordToken = function(){
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 60 * (60 * 1000);
  return resetToken;
}
const User = mongoose.model("User", UserSchema);

module.exports = User;
