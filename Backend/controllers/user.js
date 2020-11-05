const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) =>{
    User.findById(id).exec((err, user) =>{
        if(err || !user){
            return res.status(404).json({
                error: "User was not found",
            });
        }
        req.profile = user;
        next();
    });
};

exports.getUser = (req, res) => {
    req.profile.salt =undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id : req.profile.id},
        {$set : req.body},
        {new : true, userFindAndModify: false},
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error: "You are not Authorized to Update"
                });
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user);
        }
    )
}
