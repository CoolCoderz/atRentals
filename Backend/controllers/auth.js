const User = require('../models/user');
const { check , validationResult } = require("express-validator");
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
