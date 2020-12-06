const User = require('../models/user');
const { check , validationResult } = require("express-validator");
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
exports.signup = (req, res) => {

  const errors = validationResult(req)
  if(!errors.isEmpty()) { 
    return res.status(422).json({
      errors: errors.array()[0].msg
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if(err) {
      return res.status(400).json({
        err: "NOT ABLE TO SAVE USER IN DB"
      })
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  });
};
exports.signin = (req, res) => {
  // capturing email and password using destructuring
  const {email, password} = req.body;
  //  Validation
  const errors = validationResult(req)
  if(!errors.isEmpty()) { 
    return res.status(422).json({
      errors: errors.array()[0].msg
    });
  }
  
  User.findOne({email}, (err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: "User email does not exist"
      })
    }

    if(!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password do not match"
      })
    }
// CREATED TOKEN
    const token =jwt.sign({_id:user._id}, process.env.SECRET);

    // PUT TOKEN IN COOKIE
    res.cookie("token", token, { expire:new Date() +9999});

    //send response to frontend here we do not want to send all the details of user so 
    // we are using destructuring
    const {_id, name, email, role} = user;
    return res.json({token, user:{_id, name, email, role}});
  })

}
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout"
  });
};

// protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth"
});

//Custom Middlewares
exports.isAuthenticated = (req,res,next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;

  if(!checker) {
    return res.status(403).json({
      error: "ACCESS_DENIED"
    })
  }
  next();
}

exports.isAdmin = (req,res,next) => {
  if(req.profile.role === 0) {
    return res.status(403).json({
      error: "YOUR ARE NOT AN ADMIN ACCESS_DENIED"
    });
  }
  next();
}
