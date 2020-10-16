const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const schema = mongoose.Schema

var userSchema = new schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true

    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    userinfo: {
        type: String,
        trim: true
    },
    
    encry_password: {
        type: String,
        required: true
    },
    salt: String,

    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default:[]
    }

},{timestamps: true});
//USING VIRTUALS  FROM MONGOOSE AND USING UUID
userSchema.virtual("password")
    .set(function(password){
        //HERE WE USED _ to show that password is private
        this._password = password;
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this._password;
    })
// for password Encryption
userSchema.method = {
    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password;
    },
    
    securePassword: function (plainpassword) {
        if(!password)return "";
        try {
            return  crypto
              .createHmac('sha256', salt)
              .update(plainpassword)
              .digest('hex');
        } catch (err) {
            return "";
        }
    }
}

module.exports = mongoose.model("User",userSchema);