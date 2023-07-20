const crypto = require("crypto");
const User = require('../models/UserModel');
const ErrorResponse = require('../utils/errorResponseUtil');
// const {welcome_email} = require('../emails/welcome_email');
// const {verify_email, withdraw_verify_email} = require('../emails/verify_email');
// const sendEmail = require("../utils/sendEmail");

const algorithm = "aes-256-cbc";
var sanitize = require('mongo-sanitize');

function getRandomNumber(low, high) {
  let r = Math.floor(Math.random() * (high - low + 1)) + low;
  return r;
}

exports.register = async (req, res, next) => {
  let {firstname, lastname, email, password} = req.body;

  firstname = sanitize(firstname);
  lastname = sanitize(lastname);
  email = sanitize(email);
  password = sanitize(password);
  try {

    const user = await User.create({
      firstname, lastname, email, password
    });

    var name = user.firstname + ' ' + user.lastname;
    // let message = welcome_email(name);
    // await sendEmail({
    //   to: user.email,
    //   subject: `Welcome ${name} to the world of Shiba Rapid.`,
    //   text: message
    // });
    return sendToken(user, 201, res);
  }catch (error){
      next(error);
  }
};

exports.login = async(req, res, next) => {
  let {email, password} = req.body;
  email = sanitize(email);
  password = sanitize(password);

  if(!email || !password){
    return res.status(400).json({success: false, error: "Please enter email and password!"});
  }

  try{
    const user = await User.findOne({ email }).select("+password");

    if(!user){
      return res.status(404).json({success: false, error: "Email id not found!"});
    }

    const isMatch = await user.matchPassword(password);

    if(!isMatch){
      return res.status(401).json({success: false, error: "Invalid password!"});
    }

    return sendToken(user, 201, res);

  } catch (error) {
    return res.status(500).json({success: false, error: error.message});
  }
};

exports.forgotpassword = async (req, res, next) => {
  let {email} = req.body;
  email = sanitize(email);

  try{
    const user = await User.findOne({email});

    if(!user){
      return res.status(404).json({success: false, error: "Email id is invalid or not register to inofunds!"});
    }
    const resetToken = user.getResetPasswordToken();

    await user.save();
    const resetUrl = `https://${process.env.REACT_APP_URL}/passwordreset/${resetToken}`;
    // const message = `
    //   <h1>You have requested a password reset</h1>
    //   <p>Please go to this link to reset your password</p>
    //   <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    // `
    try {
      // await sendEmail({
      //   to: user.email,
      //   subject: "Password Reset Request",
      //   text: message
      // });
      return res.status(200).json({success: true, data: `Email Sent to ${email}`});
    } catch (error){
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();
      return res.status(500).json({success: false, error: "Email could not be send try after some time!"});
    }

  } catch(error) {
    next(error);
  }
};

exports.resetpassword = async (req, res, next) => {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
  try{
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: {$gt: Date.now()}
    })
    if(!user){
      return res.status(400).json({success: false, error: "Invalid reset token or token is expired!"});
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({success: true, data: "Password Changed!"})

  }catch (error){
      next(error);
  }
};

exports.otpSend = async (req, res, next) => {
  let otpno = getRandomNumber(100000, 999999);
    const cipher = crypto.createCipher(algorithm, process.env.ENCRYPT_SECRET);
    let encryptedData = cipher.update(otpno.toString(), "utf-8", "hex");
    encryptedData += cipher.final("hex");
    try {
      const user = await User.findOne({
        _id: res.user._id
      })
      if(!user){
        return res.status(400).json({success: false, error: "Invalid token or token is expired!"});
      }
      // const message = verify_email(otpno);
      //   await sendEmail({
      //     to: user.email,
      //     subject: "You have received a confirmation code to be used upon activation of your Shiba Rapid account.",
      //     text: message
      //   });

      await User.updateOne({_id: user._id}, {$set : {otp: encryptedData}});

      return res.status(201).json({success: true, data: "Otp send"});
    }catch (error){
      next(error);
    }
}

exports.otpSendWithdrawal = async (req, res, next) => {
  let otpno = getRandomNumber(100000, 999999);
    const cipher = crypto.createCipher(algorithm, process.env.ENCRYPT_SECRET);
    let encryptedData = cipher.update(otpno.toString(), "utf-8", "hex");
    encryptedData += cipher.final("hex");
    try {
      const user = await User.findOne({
        _id: res.user._id
      })
      if(!user){
        return res.status(400).json({success: false, error: "Invalid token or token is expired!"});
      }
      // const message = withdraw_verify_email(otpno);
      //   await sendEmail({
      //     to: user.email,
      //     subject: "You have received a confirmation code that you must enter when withdrawing your Shiba Rapid funds.",
      //     text: message
      //   });

      await User.updateOne({_id: user._id}, {$set : {otp: encryptedData}});

      return res.status(201).json({success: true, data: "Otp send"});
    }catch (error){
      next(error);
    }
}

exports.otpVerification = async (req, res, next) => {
  let {rotp} = req.body
  rotp = sanitize(rotp);
  try{
    const user = await User.findOne({
      _id: res.user._id
    })
    if(!user){
        return res.status(400).json({success: false, error: "Invalid token or token is expired!"});
    }
    const decipher = crypto.createDecipher(algorithm, process.env.ENCRYPT_SECRET);
    let decryptedData = decipher.update(user.otp, "hex", "utf-8");
    decryptedData += decipher.final("utf-8");

    if (rotp == decryptedData){
      date = Date.now();
      await User.updateOne({_id: user._id}, {$set : {email_verified_at: date}});
      return res.status(201).json({success: true, data: "Otp Verified!"});
    }else{
      return res.status(400).json({success: false, error: "Invalid Otp"});
    }
  }catch(error){
    next(error);
  }
}

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({success: true, token})
}
