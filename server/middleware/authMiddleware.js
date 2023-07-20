const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

exports.protect = async (req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    // Bearer slkdjflkjsdlkfkdkjksfkjdfkljdskkljf
    token = req.headers.authorization.split(" ")[1]

  }
  if(!token){
    return res.status(403).json({success: false, error: "Not authorized to access this route"});
  }
  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if(!user){

      return res.status(404).json({success: false, error: "No user found with this id"});
    }
    res.user = user;
    next();
  } catch (error){
        console.log('check here');
    return res.status(403).json({success: false, error: "Not authorized to access this route"});
  }
}
